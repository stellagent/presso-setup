import { readConfig } from "./config.js";

/**
 * Resolve an access token from available sources.
 *
 * Priority:
 *   1. PRESSO_API_KEY environment variable
 *   2. ~/.presso/config.json (saved from OAuth)
 */
export function resolveToken(): string | null {
  // 1. Environment variable
  const envKey = process.env.PRESSO_API_KEY;
  if (envKey) return envKey;

  // 2. Saved config
  const config = readConfig();
  if (config.accessToken) {
    // Check expiry
    if (config.expiresAt && Date.now() > config.expiresAt) {
      return null; // Token expired
    }
    return config.accessToken;
  }

  return null;
}
