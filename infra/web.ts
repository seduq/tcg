import { DATABASE_URL, rds } from "./postgres";
import { bucket } from "./storage"
import { vpc } from "./vpc";

const domain = new sst.Secret("NextjsDomain");
const dnsZone = new sst.Secret("NextjsDns");

export const www = new sst.aws.Nextjs("Nextjs", {
  path: "./packages/www",
  link: [rds, bucket, domain, dnsZone],
  environment: {
    DATABASE_URL
  },
  vpc,
  domain: {
    dns: sst.aws.dns({
      zone: dnsZone.value
    }),
    name: domain.value,
  }
});