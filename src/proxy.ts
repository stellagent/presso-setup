import { createInterface } from "node:readline";
import { log, error } from "./utils/logger.js";

const PRESSO_MCP_URL = "https://mcp.presso.now/mcp";

export async function startProxy(token: string): Promise<void> {
  log("Starting stdio ↔ HTTP proxy...");
  log(`Remote endpoint: ${PRESSO_MCP_URL}`);

  let sessionId: string | undefined;
  let pending = 0;
  let stdinClosed = false;

  function maybeExit(): void {
    if (stdinClosed && pending === 0) {
      log("All requests complete, exiting.");
      process.exit(0);
    }
  }

  async function forwardMessage(message: unknown): Promise<void> {
    pending++;
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      };

      // API keys go in x-api-key, JWT tokens go in Authorization: Bearer
      if (token.startsWith("ak_")) {
        headers["x-api-key"] = token;
      } else {
        headers["Authorization"] = `Bearer ${token}`;
      }
      if (sessionId) {
        headers["mcp-session-id"] = sessionId;
      }

      const res = await fetch(PRESSO_MCP_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(message),
      });

      // Capture session ID
      const newSessionId = res.headers.get("mcp-session-id");
      if (newSessionId) {
        sessionId = newSessionId;
        log(`Session: ${sessionId.substring(0, 16)}...`);
      }

      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        const body = await res.text();
        error(`HTTP ${res.status}: ${body.substring(0, 200)}`);
        if (message && typeof message === "object" && "id" in message) {
          const errRes = {
            jsonrpc: "2.0",
            id: (message as { id: unknown }).id,
            error: { code: -32000, message: `Server returned HTTP ${res.status}` },
          };
          process.stdout.write(JSON.stringify(errRes) + "\n");
        }
        return;
      }

      if (contentType.includes("text/event-stream")) {
        const text = await res.text();
        for (const line of text.split("\n")) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data:")) {
            const data = trimmed.slice(5).trim();
            if (data) {
              log(`← SSE: ${data.substring(0, 100)}...`);
              process.stdout.write(data + "\n");
            }
          }
        }
      } else {
        const data = await res.text();
        if (data.trim()) {
          log(`← ${data.substring(0, 100)}...`);
          process.stdout.write(data + "\n");
        }
      }
    } catch (err) {
      error(`Fetch error: ${err}`);
      if (message && typeof message === "object" && "id" in message) {
        const errRes = {
          jsonrpc: "2.0",
          id: (message as { id: unknown }).id,
          error: { code: -32000, message: `Proxy error: ${err}` },
        };
        process.stdout.write(JSON.stringify(errRes) + "\n");
      }
    } finally {
      pending--;
      maybeExit();
    }
  }

  const rl = createInterface({ input: process.stdin, terminal: false });

  rl.on("line", (line) => {
    if (!line.trim()) return;

    let message: unknown;
    try {
      message = JSON.parse(line);
    } catch {
      error(`Invalid JSON: ${line.substring(0, 100)}`);
      return;
    }

    log(`→ ${JSON.stringify(message).substring(0, 100)}...`);
    forwardMessage(message);
  });

  rl.on("close", () => {
    log("stdin closed.");
    stdinClosed = true;
    maybeExit();
  });

  log("Proxy is running. Forwarding MCP messages...");

  process.on("SIGINT", () => {
    log("Shutting down...");
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    log("Shutting down...");
    process.exit(0);
  });

  // Keep process alive
  await new Promise(() => {});
}
