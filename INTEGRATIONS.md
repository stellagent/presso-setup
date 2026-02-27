# Presso — Supported Integrations

Complete list of data sources, tools, and capabilities available through Presso.

## Shopify

E-commerce platform integration for querying products, orders, customers, inventory, payments, and analytics.

### Tools

| Tool | Description |
|---|---|
| `shopify_list_products` | List products with search, sort, and pagination |
| `shopify_get_product` | Get product details by ID |
| `shopify_list_orders` | List orders with status, financial, and fulfillment filters |
| `shopify_get_order` | Get order details by ID |
| `shopify_list_customers` | List customers with search and sort |
| `shopify_get_customer` | Get customer details by ID |
| `shopify_list_collections` | List product collections |
| `shopify_list_inventory_items` | List inventory with stock levels across locations |
| `shopify_list_discounts` | List discount codes and automatic discounts |
| `shopify_list_fulfillment_orders` | List fulfillment orders by status |
| `shopify_list_abandoned_checkouts` | List abandoned checkouts |
| `shopify_list_draft_orders` | List draft orders |
| `shopify_list_markets` | List configured markets |
| `shopify_list_returns` | List returns with line item details |
| `shopify_get_refund` | Get refund details by ID |
| `shopify_list_order_risks` | List orders with fraud risk assessment |
| `shopify_get_payments_account` | Get Shopify Payments balance and payouts |
| `shopify_list_balance_transactions` | List balance transactions |
| `shopify_list_tender_transactions` | List tender transactions (payment method breakdown) |
| `shopify_list_segments` | List customer segments |
| `shopify_list_marketing_activities` | List marketing activities and campaigns |
| `shopify_get_shop_info` | Get shop information and analytics |
| `shopify_get_shop_alerts` | Get shop alerts and notifications |
| `shopify_get_custom_report` | Execute custom GraphQL queries |

### Permissions

Read-only: `read_products`, `read_orders`, `read_customers`, `read_inventory`, and related scopes.

---

## Google Analytics 4

Web and app analytics for traffic, user behavior, conversions, and revenue.

### Tools

| Tool | Description |
|---|---|
| `ga4_run_report` | Run standard reports with dimensions and metrics |
| `ga4_run_realtime_report` | Get real-time active users and events |
| `ga4_get_metadata` | List available dimensions and metrics |
| `ga4_run_funnel_report` | Analyze conversion funnels with drop-off |
| `ga4_list_properties` | List accessible GA4 properties |

### Key Dimensions

Date, traffic source/medium, campaign, country, city, device, browser, OS, page path, page title, event name, new vs returning.

### Key Metrics

Sessions, users, pageviews, bounce rate, engagement rate, conversions, revenue, e-commerce purchases, average session duration.

---

## Google Ads

Paid search and display advertising for campaign performance, keywords, and spend optimization.

### Tools

| Tool | Description |
|---|---|
| `google_ads_run_report` | Custom reports with segments and metrics |
| `google_ads_list_campaigns` | List all campaigns with status |
| `google_ads_get_campaign` | Get detailed campaign data |
| `google_ads_list_ad_groups` | List ad groups within campaigns |
| `google_ads_list_keywords` | List keywords with match types and quality scores |
| `google_ads_list_ads` | List ad creatives |
| `google_ads_list_accounts` | List accessible accounts |

### Key Metrics

Impressions, clicks, CTR, CPC, cost, conversions, ROAS, quality score, impression share.

### Campaign Types

Search, Display, Shopping, Video, Performance Max, App, Demand Gen.

---

## Meta Ads

Facebook and Instagram advertising for campaign, ad set, and creative performance.

### Tools

| Tool | Description |
|---|---|
| `meta_ads_run_report` | Custom performance reports with breakdowns |
| `meta_ads_list_campaigns` | List all campaigns with status |
| `meta_ads_get_campaign` | Get detailed campaign settings |
| `meta_ads_list_ad_sets` | List ad sets with audience and budget data |
| `meta_ads_get_ad_set` | Get detailed ad set configuration |
| `meta_ads_list_ads` | List ads with creative details |
| `meta_ads_get_ad` | Get individual ad information |
| `meta_ads_list_accounts` | List accessible ad accounts |
| `meta_ads_get_ad_creatives` | Get creative assets |

### Key Metrics

Reach, impressions, frequency, CPM, clicks, CTR, CPC, conversions, purchases, ROAS, spend.

### Breakdowns

Date, week, month, age, gender, platform, placement, device, country.

---

## Google Search Console

Organic search performance for queries, rankings, CTR, and indexing.

### Tools

| Tool | Description |
|---|---|
| `search_console_query` | Search performance with filters and dimensions |
| `search_console_list_sites` | List verified properties |
| `search_console_get_sitemaps` | Get sitemap information |

### Key Metrics

Clicks, impressions, CTR, average position.

### Dimensions

Query, page URL, country, device, search appearance, date.

---

## Google Merchant Center

Product feed management for feed health, approvals, diagnostics, and price competitiveness.

### Tools

| Tool | Description |
|---|---|
| `gmc_list_products` | List products with status and attributes |
| `gmc_get_product` | Get specific product details |
| `gmc_get_product_status` | Get approval status and issues |
| `gmc_list_product_statuses` | Get status across all products |
| `gmc_get_account_status` | Get account-level diagnostics |
| `gmc_list_account_issues` | List all account-level issues |
| `gmc_get_price_competitiveness` | Price comparison analysis |

### Product Statuses

Active, Pending, Disapproved, Expiring.

---

## Amazon Ads

Amazon advertising for Sponsored Products, Brands, and Display campaigns.

### Tools

| Tool | Description |
|---|---|
| `amazon_ads_list_campaigns` | List all campaigns with status |
| `amazon_ads_get_campaign` | Get detailed campaign info |
| `amazon_ads_list_ad_groups` | List ad groups within campaigns |
| `amazon_ads_get_campaign_report` | Get campaign performance metrics |
| `amazon_ads_get_keyword_report` | Get keyword-level data |
| `amazon_ads_get_search_term_report` | Get search term performance |
| `amazon_ads_get_product_ads_report` | Get product-level performance |

### Key Metrics

Impressions, clicks, CTR, spend, sales, orders, ACoS, ROAS, CPC, CVR.

---

## Google Tag Manager

Tag management for auditing tags, triggers, variables, and container versions.

### Tools

| Tool | Description |
|---|---|
| `gtm_list_accounts` | List GTM accounts |
| `gtm_list_containers` | List containers within accounts |
| `gtm_get_container` | Get container details |
| `gtm_list_tags` | List all tags in workspace |
| `gtm_get_tag` | Get tag configuration |
| `gtm_list_triggers` | List all triggers |
| `gtm_get_trigger` | Get trigger details |
| `gtm_list_variables` | List all variables |
| `gtm_get_variable` | Get variable configuration |
| `gtm_list_workspaces` | List workspaces |
| `gtm_list_versions` | List published versions |
| `gtm_get_version` | Get version details |

---

## Klaviyo

Email and SMS marketing for campaigns, flows, profiles, and customer analytics.

### Tools

| Tool | Description |
|---|---|
| `klaviyo_list_campaigns` | List email/SMS campaigns |
| `klaviyo_get_campaign` | Get campaign details |
| `klaviyo_query_campaign_report` | Get campaign performance metrics |
| `klaviyo_list_flows` | List automation flows |
| `klaviyo_get_flow` | Get flow details |
| `klaviyo_query_flow_report` | Get flow performance metrics |
| `klaviyo_list_profiles` | List customer profiles |
| `klaviyo_get_profile` | Get profile with predictive CLV/churn |
| `klaviyo_list_segments` | List audience segments |
| `klaviyo_get_segment` | Get segment details |
| `klaviyo_get_segment_profiles` | Get profiles within a segment |
| `klaviyo_list_lists` | List mailing lists |
| `klaviyo_get_list` | Get list details |
| `klaviyo_list_metrics` | List available metrics |
| `klaviyo_query_metric_aggregates` | Aggregate metric data |
| `klaviyo_list_events` | List tracked events |
| `klaviyo_list_catalog_items` | List catalog items |
| `klaviyo_list_templates` | List email templates |

### Predictive Analytics

Predicted customer lifetime value (CLV) and churn probability per profile.

---

## ShipStation

Multi-carrier shipping for shipments, labels, tracking, rates, and inventory.

### Tools

| Tool | Description |
|---|---|
| `shipstation_get_shipments` | List shipments with filters |
| `shipstation_get_shipment_by_id` | Get shipment details |
| `shipstation_get_shipment_rates` | Get rates for a shipment |
| `shipstation_get_shipment_tags` | Get tags on a shipment |
| `shipstation_get_labels` | List shipping labels |
| `shipstation_get_label_by_id` | Get label details |
| `shipstation_get_label_tracking` | Get label tracking info |
| `shipstation_track_package` | Track a package |
| `shipstation_calculate_rates` | Calculate shipping rates |
| `shipstation_estimate_rates` | Estimate rates for dimensions |
| `shipstation_get_rate_by_id` | Get rate details |
| `shipstation_get_carriers` | List available carriers |
| `shipstation_get_carrier_by_id` | Get carrier details |
| `shipstation_get_carrier_services` | List carrier services |
| `shipstation_get_carrier_package_types` | List package types |
| `shipstation_get_carrier_options` | Get carrier options |
| `shipstation_get_inventory` | Get inventory levels |
| `shipstation_get_warehouses` | List warehouses |
| `shipstation_get_warehouse_by_id` | Get warehouse details |
| `shipstation_get_batches` | List shipment batches |
| `shipstation_get_batch_by_id` | Get batch details |
| `shipstation_get_batch_errors` | Get batch processing errors |
| `shipstation_get_manifests` | List manifests |
| `shipstation_get_manifest_by_id` | Get manifest details |
| `shipstation_get_tags` | List available tags |
| `shipstation_get_packages` | List custom packages |
| `shipstation_get_package_by_id` | Get package details |
| `shipstation_get_pickups` | List scheduled pickups |
| `shipstation_get_pickup_by_id` | Get pickup details |

---

## Judge.me

Product reviews and ratings for customer feedback and store reputation.

### Tools

| Tool | Description |
|---|---|
| `judgeme_list_reviews` | List product reviews |
| `judgeme_get_review` | Get review details |
| `judgeme_get_review_count` | Get review count for a product |
| `judgeme_get_reviewer` | Get reviewer profile |
| `judgeme_get_shop_info` | Get shop information |
| `judgeme_get_settings` | Get Judge.me settings |
| `judgeme_get_all_reviews_count` | Get total review count |
| `judgeme_get_all_reviews_rating` | Get overall average rating |
| `judgeme_get_shop_reviews_count` | Get shop-level review count |
| `judgeme_get_shop_reviews_rating` | Get shop-level average rating |
