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
    //const api = await import("./infra/api");
    const vpc = await import("./infra/vpc");
    const postgres = await import("./infra/postgres");
    const www = await import("./infra/web");
    new sst.x.DevCommand("Studio", {
      link: [postgres],
      dev: {
        autostart: true,
        directory: "./packages/www",
        command: "bun drizzle-kit studio",
      },
    });

    return {
      //api: api.myApi.url,
      s3: storage.bucket.domain,
      www: www.www.url
    };
  },
});
