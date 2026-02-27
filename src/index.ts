#!/usr/bin/env node

import { resolveToken } from "./auth/token.js";
import { readConfig, deleteConfig } from "./auth/config.js";
import { runOAuthFlow } from "./auth/oauth.js";
import { startProxy } from "./proxy.js";
import { log, error } from "./utils/logger.js";

const command = process.argv[2];

async function main(): Promise<void> {
  switch (command) {
    case "setup":
      await handleSetup();
      break;

    case "status":
      handleStatus();
      break;

    case "logout":
      handleLogout();
      break;

    default:
      await handleProxy();
      break;
  }
}

async function handleSetup(): Promise<void> {
  if (!process.stdin.isTTY) {
    error("OAuth setup requires an interactive terminal.");
    error("Run this command directly in your terminal: npx presso-mcp setup");
    process.exit(1);
  }

  log("Starting Presso OAuth setup...");
  await runOAuthFlow();
}

function handleStatus(): void {
  const envKey = process.env.PRESSO_API_KEY;
  if (envKey) {
    log("Authenticated via PRESSO_API_KEY environment variable.");
    return;
  }

  const config = readConfig();
  if (!config.accessToken) {
    log("Not authenticated.");
    log("Run: npx presso-mcp setup");
    return;
  }

  if (config.expiresAt && Date.now() > config.expiresAt) {
    log("Token expired.");
    log("Run: npx presso-mcp setup");
    return;
  }

  const expiresIn = config.expiresAt
    ? Math.round((config.expiresAt - Date.now()) / 1000 / 60 / 60 / 24)
    : "unknown";
  log(`Authenticated via ~/.presso/config.json (expires in ~${expiresIn} days).`);
}

function handleLogout(): void {
  deleteConfig();
  log("Logged out. Saved tokens removed.");
}

async function handleProxy(): Promise<void> {
  const token = resolveToken();

  if (token) {
    await startProxy(token);
    return;
  }

  // No token available
  if (process.stdin.isTTY) {
    log("No authentication found. Starting OAuth setup...");
    await runOAuthFlow();

    const newToken = resolveToken();
    if (!newToken) {
      error("Authentication failed. Please try again.");
      process.exit(1);
      return; // unreachable but satisfies TS
    }

    await startProxy(newToken);
  } else {
    error("No authentication found.");
    error("");
    error("To authenticate, either:");
    error("  1. Set the PRESSO_API_KEY environment variable, or");
    error("  2. Run: npx presso-mcp setup");
    error("");
    error("Then configure your MCP client with:");
    error('  { "command": "npx", "args": ["-y", "presso-mcp"], "env": { "PRESSO_API_KEY": "your-key" } }');
    process.exit(1);
  }
}

main().catch((err) => {
  error(String(err));
  process.exit(1);
});
