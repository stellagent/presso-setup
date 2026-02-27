/**
 * Stderr-only logger to keep stdout clean for MCP stdio transport.
 */

const PREFIX = "[presso-mcp]";

export function log(message: string): void {
  process.stderr.write(`${PREFIX} ${message}\n`);
}

export function error(message: string): void {
  process.stderr.write(`${PREFIX} ERROR: ${message}\n`);
}

export function warn(message: string): void {
  process.stderr.write(`${PREFIX} WARN: ${message}\n`);
}
