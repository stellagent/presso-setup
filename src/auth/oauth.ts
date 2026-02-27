import { createServer } from "node:http";
import { randomBytes, createHash } from "node:crypto";
import { writeConfig } from "./config.js";
import { log, error } from "../utils/logger.js";

const AUTH_BASE = "https://app.presso.now";
const CLIENT_NAME = "presso-mcp-cli";

interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

function base64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function generatePKCE(): { verifier: string; challenge: string } {
  const verifier = base64url(randomBytes(32));
  const challenge = base64url(createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
}

async function registerClient(
  redirectUri: string,
): Promise<{ clientId: string }> {
  const res = await fetch(`${AUTH_BASE}/api/oauth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_name: CLIENT_NAME,
      redirect_uris: [redirectUri],
      grant_types: ["authorization_code"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    }),
  });

  if (!res.ok) {
    throw new Error(`Client registration failed: ${res.status}`);
  }

  const data = (await res.json()) as { client_id: string };
  return { clientId: data.client_id };
}

async function exchangeCode(
  code: string,
  redirectUri: string,
  codeVerifier: string,
  clientId: string,
): Promise<OAuthTokenResponse> {
  const res = await fetch(`${AUTH_BASE}/api/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
      client_id: clientId,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} — ${text}`);
  }

  return (await res.json()) as OAuthTokenResponse;
}

export async function runOAuthFlow(): Promise<void> {
  const { verifier, challenge } = generatePKCE();

  // Start a temporary local HTTP server on a random port
  const server = createServer();
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  const redirectUri = `http://127.0.0.1:${port}/callback`;

  log(`Callback server listening on port ${port}`);

  // Register a dynamic OAuth client
  const { clientId } = await registerClient(redirectUri);

  // Build the authorization URL
  const state = base64url(randomBytes(16));
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
    scope: "mcp:read mcp:write",
  });
  const authUrl = `${AUTH_BASE}/oauth/authorize?${params}`;

  // Open the browser
  log("Opening browser for authentication...");
  const open = (await import("open")).default;
  await open(authUrl);
  log("If the browser didn't open, visit this URL:");
  log(authUrl);

  // Wait for the callback
  const code = await new Promise<string>((resolve, reject) => {
    const timeout = setTimeout(() => {
      server.close();
      reject(new Error("OAuth callback timed out after 2 minutes"));
    }, 120_000);

    server.on("request", (req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse) => {
      const url = new URL(req.url!, `http://127.0.0.1:${port}`);
      if (url.pathname !== "/callback") {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const returnedState = url.searchParams.get("state");
      const returnedCode = url.searchParams.get("code");
      const errorParam = url.searchParams.get("error");

      if (errorParam) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          "<html><body><h1>Authentication failed</h1><p>You can close this tab.</p></body></html>",
        );
        clearTimeout(timeout);
        server.close();
        reject(new Error(`OAuth error: ${errorParam}`));
        return;
      }

      if (returnedState !== state) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(
          "<html><body><h1>State mismatch</h1><p>Please try again.</p></body></html>",
        );
        clearTimeout(timeout);
        server.close();
        reject(new Error("OAuth state mismatch"));
        return;
      }

      if (!returnedCode) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(
          "<html><body><h1>No code received</h1><p>Please try again.</p></body></html>",
        );
        clearTimeout(timeout);
        server.close();
        reject(new Error("No authorization code received"));
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<html><body><h1>Authenticated!</h1><p>You can close this tab and return to your terminal.</p></body></html>",
      );
      clearTimeout(timeout);
      server.close();
      resolve(returnedCode);
    });
  });

  // Exchange the code for a token
  log("Exchanging authorization code for token...");
  const tokenResponse = await exchangeCode(code, redirectUri, verifier, clientId);

  // Save the token
  writeConfig({
    accessToken: tokenResponse.access_token,
    expiresAt: Date.now() + tokenResponse.expires_in * 1000,
  });

  log("Authentication successful! Token saved to ~/.presso/config.json");
}
