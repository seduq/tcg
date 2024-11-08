import { vpc } from "./vpc"
export const rds = new sst.aws.Postgres("Database", {
  vpc,
  storage: "50 GB"
});
export const DATABASE_URL = $interpolate`postgresql://${rds.username}:${rds.password}@${rds.host}:${rds.port}/${rds.database}`