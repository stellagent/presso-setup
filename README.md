# Presso

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)
[![npm version](https://img.shields.io/npm/v/presso-mcp)](https://www.npmjs.com/package/presso-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<p align="center">
  <img src="assets/logo-400x400.png" alt="Presso Logo" width="200" />
</p>

<p align="center">
  <a href="https://presso.now">Website</a> · <a href="https://app.presso.now/signup">Get Started</a> · <a href="https://presso.now/docs">Docs</a>
</p>

## Overview

[Presso](https://presso.now) is an MCP server that connects your e-commerce and marketing data sources — Shopify, Google Analytics 4, Google Ads, Meta Ads, and more — directly to AI assistants like Claude. Instead of switching between dashboards, ask questions in natural language and get instant answers about your store's performance, ad campaigns, and customer behavior.

The MCP endpoint is a remote HTTP server. Most AI clients (Claude Code, Claude Desktop, Cursor, VS Code) can connect directly. For clients that only support stdio, a lightweight npm proxy (`presso-mcp`) is also available.

## Features

- **11 data source integrations** — Shopify, GA4, Google Ads, Meta Ads, Search Console, Google Merchant Center, Amazon Ads, GTM, Klaviyo, ShipStation, Judge.me
- **100+ tools** — Products, orders, customers, analytics reports, ad campaigns, keyword analysis, shipping, reviews, and more
- **Cross-platform analysis** — Correlate data across Shopify + GA4 + ad platforms in a single conversation
- **Natural language queries** — No SQL or API knowledge required. Ask like you would ask an analyst
- **Real-time data** — Fetches live data from source APIs on every request
- **Read-only access** — Presso never modifies your store data, ad campaigns, or settings
- **OAuth authentication** — Secure token-based access. Presso never stores your passwords
- **Encrypted at rest and in transit** — AES-256 encryption for tokens, TLS 1.2+ for all traffic
- **No permanent raw data storage** — Query results are streamed to the AI client and not retained

## Supported Data Sources

| Data Source | Description | Tools |
|---|---|---|
| **Shopify** | Products, orders, customers, inventory, payments, analytics | 25+ |
| **Google Analytics 4** | Reports, dimensions, metrics, real-time data, funnels | 5 |
| **Google Ads** | Campaigns, ad groups, keywords, quality scores, ROAS | 7 |
| **Meta Ads** | Campaigns, ad sets, creatives, audience insights | 9 |
| **Google Search Console** | Search queries, rankings, CTR, sitemaps | 3 |
| **Google Merchant Center** | Product feeds, status, diagnostics, price competitiveness | 7 |
| **Amazon Ads** | Sponsored products/brands/display, search terms, ACoS | 7 |
| **Google Tag Manager** | Containers, tags, triggers, variables, versions | 12 |
| **Klaviyo** | Campaigns, flows, profiles, segments, predictive analytics | 18 |
| **ShipStation** | Shipments, labels, carriers, rates, inventory, warehouses | 29 |
| **Judge.me** | Reviews, ratings, reviewer profiles, shop statistics | 10 |

## Quick Start

### 1. Create your Presso account

Go to [app.presso.now/signup](https://app.presso.now/signup) and create an account. No credit card required — every account starts with a 14-day free trial.

### 2. Connect your data sources

From the Presso dashboard, click **Add Connection**, select a data source (e.g., Shopify, GA4), and authorize via OAuth. Repeat for each data source you want to query.

### 3. Add Presso to your MCP client

See the configuration section below for your specific client.

## MCP Client Configuration

### Claude Code

Open your terminal and run:

```bash
claude mcp add --transport http presso https://mcp.presso.now/mcp
```

Then start a new Claude Code session:

```bash
claude
```

Claude Code will automatically detect Presso's tools. Try asking: `"Show me my top-selling products from last week."`

### Claude Desktop

1. Open Claude Desktop → **Settings** → **Developer** → **Edit Config**.
2. Add Presso to the `mcpServers` section:

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

3. Save and restart Claude Desktop.

### Cursor

Add to your Cursor MCP settings (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "presso": {
      "url": "https://mcp.presso.now/mcp"
    }
  }
}
```

### VS Code (Copilot)

Add to your VS Code settings (`settings.json`):

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

### stdio via npx

For MCP clients that only support stdio transport, use the `presso-mcp` proxy:

```bash
npx -y presso-mcp
```

Or configure it in your MCP client's JSON:

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

Run `npx presso-mcp setup` to authenticate via OAuth, or set the `PRESSO_API_KEY` environment variable.

## Available Tools

### Shopify

`shopify_list_products` · `shopify_get_product` · `shopify_list_orders` · `shopify_get_order` · `shopify_list_customers` · `shopify_get_customer` · `shopify_list_collections` · `shopify_list_inventory_items` · `shopify_list_discounts` · `shopify_list_fulfillment_orders` · `shopify_list_abandoned_checkouts` · `shopify_list_draft_orders` · `shopify_list_markets` · `shopify_list_returns` · `shopify_get_refund` · `shopify_list_order_risks` · `shopify_get_payments_account` · `shopify_list_balance_transactions` · `shopify_list_tender_transactions` · `shopify_list_segments` · `shopify_list_marketing_activities` · `shopify_get_shop_info` · `shopify_get_shop_alerts` · `shopify_get_custom_report`

### Google Analytics 4

`ga4_run_report` · `ga4_run_realtime_report` · `ga4_get_metadata` · `ga4_run_funnel_report` · `ga4_list_properties`

### Google Ads

`google_ads_run_report` · `google_ads_list_campaigns` · `google_ads_get_campaign` · `google_ads_list_ad_groups` · `google_ads_list_keywords` · `google_ads_list_ads` · `google_ads_list_accounts`

### Meta Ads

`meta_ads_run_report` · `meta_ads_list_campaigns` · `meta_ads_get_campaign` · `meta_ads_list_ad_sets` · `meta_ads_get_ad_set` · `meta_ads_list_ads` · `meta_ads_get_ad` · `meta_ads_list_accounts` · `meta_ads_get_ad_creatives`

### Google Search Console

`search_console_query` · `search_console_list_sites` · `search_console_get_sitemaps`

### Google Merchant Center

`gmc_list_products` · `gmc_get_product` · `gmc_get_product_status` · `gmc_list_product_statuses` · `gmc_get_account_status` · `gmc_list_account_issues` · `gmc_get_price_competitiveness`

### Amazon Ads

`amazon_ads_list_campaigns` · `amazon_ads_get_campaign` · `amazon_ads_list_ad_groups` · `amazon_ads_get_campaign_report` · `amazon_ads_get_keyword_report` · `amazon_ads_get_search_term_report` · `amazon_ads_get_product_ads_report`

### Google Tag Manager

`gtm_list_accounts` · `gtm_list_containers` · `gtm_get_container` · `gtm_list_tags` · `gtm_get_tag` · `gtm_list_triggers` · `gtm_get_trigger` · `gtm_list_variables` · `gtm_get_variable` · `gtm_list_workspaces` · `gtm_list_versions` · `gtm_get_version`

### Klaviyo

`klaviyo_list_campaigns` · `klaviyo_get_campaign` · `klaviyo_query_campaign_report` · `klaviyo_list_flows` · `klaviyo_get_flow` · `klaviyo_query_flow_report` · `klaviyo_list_profiles` · `klaviyo_get_profile` · `klaviyo_list_segments` · `klaviyo_get_segment` · `klaviyo_get_segment_profiles` · `klaviyo_list_lists` · `klaviyo_get_list` · `klaviyo_list_metrics` · `klaviyo_query_metric_aggregates` · `klaviyo_list_events` · `klaviyo_list_catalog_items` · `klaviyo_list_templates`

### ShipStation

`shipstation_get_shipments` · `shipstation_get_shipment_by_id` · `shipstation_get_shipment_rates` · `shipstation_get_labels` · `shipstation_get_label_by_id` · `shipstation_get_label_tracking` · `shipstation_track_package` · `shipstation_calculate_rates` · `shipstation_estimate_rates` · `shipstation_get_carriers` · `shipstation_get_carrier_by_id` · `shipstation_get_carrier_services` · `shipstation_get_carrier_package_types` · `shipstation_get_carrier_options` · `shipstation_get_inventory` · `shipstation_get_warehouses` · `shipstation_get_warehouse_by_id` · `shipstation_get_batches` · `shipstation_get_batch_by_id` · `shipstation_get_batch_errors` · `shipstation_get_manifests` · `shipstation_get_manifest_by_id` · `shipstation_get_tags` · `shipstation_get_packages` · `shipstation_get_package_by_id` · `shipstation_get_pickups` · `shipstation_get_pickup_by_id` · `shipstation_get_rate_by_id` · `shipstation_get_shipment_tags`

### Judge.me

`judgeme_list_reviews` · `judgeme_get_review` · `judgeme_get_review_count` · `judgeme_get_reviewer` · `judgeme_get_shop_info` · `judgeme_get_settings` · `judgeme_get_all_reviews_count` · `judgeme_get_all_reviews_rating` · `judgeme_get_shop_reviews_count` · `judgeme_get_shop_reviews_rating`

## Example Queries

```
Show me my top 10 best-selling products from the last 30 days.
```

```
Compare Google Ads and Meta Ads ROAS for this month — which platform is performing better?
```

```
Which products are running low on stock but had high sales last week?
```

```
Show me daily sessions and conversion rate from GA4 for the past 14 days.
```

```
Create a weekly performance report: revenue, orders, AOV, top products, and ad spend breakdown.
```

## How It Works

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  AI Client   │────>│   Presso     │────>│ Data Sources │
│  (Claude,    │<────│  MCP Server  │<────│ (Shopify,    │
│   Cursor,    │     │              │     │  GA4, Ads,   │
│   VS Code)   │     │              │     │  etc.)       │
└──────────────┘     └──────────────┘     └──────────────┘
   Natural           HTTP or stdio         OAuth tokens
   language          MCP protocol          per provider
```

1. You ask a question in your AI client.
2. The AI client calls Presso's MCP tools based on your request.
3. Presso authenticates with the relevant data source using your stored OAuth tokens.
4. Data is fetched in real time and returned to the AI client.
5. The AI client presents the results with analysis and recommendations.

## Pricing

| Plan | Price | Connections | Best for |
|---|---|---|---|
| **Free** | $0/mo | 1 connection | Trying out Presso |
| **Standard** | $49/mo | 3 connections | Small stores |
| **Pro** | $99/mo | 10 connections | Growing businesses |
| **Max** | $199/mo | Unlimited | Agencies & enterprise |

Every new account starts with a **14-day free trial** with full access. See [presso.now/pricing](https://presso.now/pricing) for details.

## Security & Privacy

- **Read-only access** — Presso never modifies your store data, ad campaigns, or settings
- **OAuth 2.0** — Secure token-based authentication. Presso never sees or stores your passwords
- **AES-256 encryption** — All OAuth tokens encrypted at rest
- **TLS 1.2+** — All data encrypted in transit
- **No permanent raw data storage** — Data is fetched in real time and streamed to the AI client
- **Scoped permissions** — Minimum necessary permissions requested for each data source
- **Credential isolation** — Tokens stored separately per user, never shared between accounts

## Links

- **Website:** [presso.now](https://presso.now)
- **App / Dashboard:** [app.presso.now](https://app.presso.now)
- **Documentation:** [presso.now/docs](https://presso.now/docs)
- **Terms of Service:** [presso.now/terms](https://presso.now/terms)
- **Privacy Policy:** [presso.now/privacy](https://presso.now/privacy)
- **Support:** [contact@stellagent.ai](mailto:contact@stellagent.ai)

## License

[MIT](LICENSE) — Copyright (c) 2026 Stellagent Inc.
