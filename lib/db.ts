import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Neon (Postgres) client. Server-side only.
 * DATABASE_URL is a plain env var (never NEXT_PUBLIC_), set in Vercel / .env.local.
 * When DATABASE_URL is missing, sql is null and the data layer falls back
 * to empty results so pages never crash.
 */
const connectionString = process.env.DATABASE_URL;

export const sql: NeonQueryFunction<false, false> | null = connectionString
  ? neon(connectionString)
  : null;

export function hasDb(): boolean {
  return sql !== null;
}
