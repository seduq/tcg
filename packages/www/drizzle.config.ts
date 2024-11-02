import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    ssl: "prefer",
    user: Resource.Database.username,
    password: Resource.Database.password,
    host: Resource.Database.host,
    port: Resource.Database.port,
    database: Resource.Database.database,
  },
  schema: ["./src/**/*.sql.ts"],
  out: "../../migrations",
});