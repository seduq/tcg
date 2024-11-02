import { vpc } from "./vpc"
export const rds = new sst.aws.Postgres("Database", {
  vpc,
  storage: "50 GB"
});
