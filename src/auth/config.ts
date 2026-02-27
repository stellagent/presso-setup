import { readFileSync, writeFileSync, mkdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

export interface PressoConfig {
  accessToken?: string;
  expiresAt?: number;
}

function getConfigDir(): string {
  return join(homedir(), ".presso");
}

function getConfigPath(): string {
  return join(getConfigDir(), "config.json");
}

export function readConfig(): PressoConfig {
  try {
    const raw = readFileSync(getConfigPath(), "utf-8");
    return JSON.parse(raw) as PressoConfig;
  } catch {
    return {};
  }
}

export function writeConfig(config: PressoConfig): void {
  const dir = getConfigDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(getConfigPath(), JSON.stringify(config, null, 2) + "\n", {
    mode: 0o600,
  });
}

export function deleteConfig(): void {
  try {
    unlinkSync(getConfigPath());
  } catch {
    // Already gone
  }
}
