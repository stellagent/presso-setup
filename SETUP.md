# Presso — Detailed Setup Guide

This guide covers all setup methods in detail, including troubleshooting.

## Prerequisites

- **An MCP-compatible AI client** — Claude Code, Claude Desktop, Cursor, VS Code, or any client supporting the MCP protocol
- **A Presso account** — Sign up at [app.presso.now/signup](https://app.presso.now/signup)
- **At least one connected data source** — Shopify, GA4, Google Ads, Meta Ads, etc.
- **Node.js 18+** (only required for the stdio proxy method)

## Step 1: Create Your Account

1. Go to [app.presso.now/signup](https://app.presso.now/signup).
2. Sign up with your email or Google account.
3. You'll land on the Presso dashboard.

No credit card required. Every account includes a 14-day free trial with full access.

## Step 2: Connect Data Sources

1. Click **Add Connection** on the dashboard.
2. Select a data source (e.g., Shopify, GA4, Google Ads).
3. You'll be redirected to the provider's OAuth consent screen. Review the requested permissions and click **Allow**.
4. After authorization, the connection appears as **Connected** on your dashboard.

Repeat for each data source. You can connect multiple sources and query them together.

### Provider-Specific Notes

| Data Source | Requirements |
|---|---|
| **Shopify** | Store owner or staff permissions to install apps |
| **GA4** | Google account with access to the GA4 property |
| **Google Ads** | Google Ads account with campaign data |
| **Meta Ads** | Meta Business account with ad account access |
| **Search Console** | Google account with verified site property |
| **Google Merchant Center** | Merchant Center account with product feed |
| **Amazon Ads** | Amazon Advertising account |
| **GTM** | Google account with GTM container access |
| **Klaviyo** | Klaviyo account with campaign data |
| **ShipStation** | ShipStation account (Gold plan or higher for API access) |
| **Judge.me** | Judge.me account connected to a Shopify store |

## Step 3: Configure Your MCP Client

### Method A: HTTP Direct Connection (Recommended)

Most modern MCP clients support direct HTTP connections. This is the simplest setup — no local dependencies required.

#### Claude Code

```bash
claude mcp add --transport http presso https://mcp.presso.now/mcp
```

Verify:

```bash
claude mcp list
```

#### Claude Desktop

Edit `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "presso": {
      "type": "http",
      "url": "https://mcp.presso.now/mcp"
    }
  }
}
```

Restart Claude Desktop after saving.

#### Cursor

Add to `.cursor/mcp.json` in your project or global config:

```json
{
  "mcpServers": {
    "presso": {
      "url": "https://mcp.presso.now/mcp"
    }
  }
}
```

#### VS Code (Copilot)

Add to `settings.json`:

```json
{
  "mcp": {
    "servers": {
      "presso": {
        "type": "http",
        "url": "https://mcp.presso.now/mcp"
      }
    }
  }
}
```

### Method B: stdio Proxy via npx

For clients that only support stdio transport, use the `presso-mcp` npm package as a local proxy.

#### Setup authentication

```bash
npx presso-mcp setup
```

This opens your browser for OAuth authentication. After login, a token is saved to `~/.presso/config.json`.

Alternatively, set an API key as an environment variable:

```bash
export PRESSO_API_KEY=your-api-key
```

#### Configure your MCP client

```json
{
  "mcpServers": {
    "presso": {
      "command": "npx",
      "args": ["-y", "presso-mcp"],
      "env": {
        "PRESSO_API_KEY": "your-api-key"
      }
    }
  }
}
```

#### CLI commands

| Command | Description |
|---|---|
| `npx presso-mcp` | Start the stdio proxy (requires authentication) |
| `npx presso-mcp setup` | Run interactive OAuth authentication |
| `npx presso-mcp status` | Check authentication status |
| `npx presso-mcp logout` | Remove saved tokens |

## Step 4: Verify the Connection

Start a new session in your AI client and try:

```
What Presso tools are available?
```

or:

```
Show me my Shopify shop info.
```

If you get a response with your store data, the connection is working.

## Authentication Flow

When you first connect via HTTP, the MCP client handles OAuth automatically:

1. Your AI client sends a tool request to Presso.
2. Presso initiates browser-based OAuth authentication.
3. You log in to your Presso account and authorize access.
4. The session is maintained for subsequent requests.

You don't need to manage API keys or tokens manually for HTTP connections.

## Troubleshooting

### "MCP server not found" or connection refused

- Verify the server is registered: `claude mcp list`
- Ensure the URL is exactly `https://mcp.presso.now/mcp`
- Check your internet connection

### "Authentication required" or "Session expired"

- Your session may have expired. The client will prompt you to re-authenticate.
- If using the stdio proxy, run `npx presso-mcp setup` again.

### Tools appear but return errors

- Check that the relevant data source is connected in the [Presso dashboard](https://app.presso.now).
- The data source's OAuth token may have expired. Disconnect and reconnect it in the dashboard.

### Slow responses

- Large data queries may take longer. Try narrowing your request with filters or date ranges.
- Network latency to the Presso server can vary for remote connections.

### Claude Code doesn't recognize Presso tools

- Restart Claude Code (Ctrl+C and run `claude` again). MCP servers are loaded at startup.
- Verify with `claude mcp list`.
- Ensure you're using a recent version of Claude Code.
