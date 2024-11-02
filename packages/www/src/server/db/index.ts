import { Resource } from "sst";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as posts from "./posts.sql"

const client = new Pool({
  user: Resource.Database.username,
  password: Resource.Database.password,
  database: Resource.Database.database,
  host: Resource.Database.host,
  port: Resource.Database.port,
});

export const db = drizzle(client, {
  schema: { ...posts },
  logger:
    process.env.DRIZZLE_LOG === "true"
      ? {
        logQuery(query, params) {
          console.log("query:", query);
          console.log("params:", params);
        },
      }
      : undefined,
});