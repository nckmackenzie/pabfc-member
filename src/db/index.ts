import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/drizzle/schema";
import { env } from "@/env/server";

export const db = drizzle(env.DATABASE_URL, { schema });
