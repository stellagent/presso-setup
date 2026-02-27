#!/bin/bash

# Add Presso as an MCP server in Claude Code (HTTP direct connection)
claude mcp add --transport http presso https://mcp.presso.now/mcp

# Or add with project scope (shared via .mcp.json)
# claude mcp add --transport http --scope project presso https://mcp.presso.now/mcp

# Alternative: use the stdio proxy via npx
# claude mcp add --transport stdio presso -- npx -y presso-mcp

# Verify the connection
claude mcp list
