import { type Config } from "drizzle-kit";

import { env } from "@tcg/www/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["www_*"],
} satisfies Config;
