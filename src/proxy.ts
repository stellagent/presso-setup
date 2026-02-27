import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { log, error } from "./utils/logger.js";

const PRESSO_MCP_URL = "https://mcp.presso.now/mcp";

export async function startProxy(token: string): Promise<void> {
  log("Starting stdio ↔ HTTP proxy...");
  log(`Remote endpoint: ${PRESSO_MCP_URL}`);

  // Local side: stdio transport (talks to the MCP client)
  const stdioTransport = new StdioServerTransport();

  // Remote side: HTTP transport (talks to Presso's MCP server)
  const httpTransport = new StreamableHTTPClientTransport(
    new URL(PRESSO_MCP_URL),
    {
      requestInit: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  );

  // Bridge messages bidirectionally
  stdioTransport.onmessage = (message) => {
    httpTransport.send(message).catch((err) => {
      error(`Failed to forward to remote: ${err}`);
    });
  };

  httpTransport.onmessage = (message) => {
    stdioTransport.send(message).catch((err) => {
      error(`Failed to forward to client: ${err}`);
    });
  };

  // Handle close events
  stdioTransport.onclose = () => {
    log("Client disconnected, shutting down.");
    httpTransport.close().catch(() => {});
    process.exit(0);
  };

  httpTransport.onclose = () => {
    log("Remote server disconnected.");
    stdioTransport.close().catch(() => {});
    process.exit(1);
  };

  // Handle errors
  stdioTransport.onerror = (err) => {
    error(`Stdio transport error: ${err}`);
  };

  httpTransport.onerror = (err) => {
    error(`HTTP transport error: ${err}`);
  };

  // Start both transports
  await stdioTransport.start();
  await httpTransport.start();

  log("Proxy is running. Forwarding MCP messages...");

  // Keep the process alive
  process.on("SIGINT", () => {
    log("Received SIGINT, shutting down...");
    stdioTransport.close().catch(() => {});
    httpTransport.close().catch(() => {});
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    log("Received SIGTERM, shutting down...");
    stdioTransport.close().catch(() => {});
    httpTransport.close().catch(() => {});
    process.exit(0);
  });
}
