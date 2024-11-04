/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      providers: {
        aws: {
          profile: "seduq-dev"
        }
      },
      name: "tcg",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const storage = await import("./infra/storage");
    const vpc = await import("./infra/vpc");
    const postgres = await import("./infra/postgres");
    const www = await import("./infra/web");

    return {
      s3: storage.bucket.domain,
      www: www.www.url
    };
  },
});
