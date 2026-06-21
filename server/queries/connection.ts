import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let instance: any = null;

export async function getDb() {
  if (!env.databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }
  if (!instance) {
    const { drizzle } = await import("drizzle-orm/mysql2");
    instance = drizzle(env.databaseUrl, {
      mode: "planetscale",
      schema: fullSchema,
    });
  }
  return instance;
}
