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
    const api = await import("./infra/api");

    return {
      api: api.myApi.url,
    };
  },
});
