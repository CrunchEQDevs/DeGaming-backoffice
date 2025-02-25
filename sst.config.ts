// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

import { config } from "./config";

export default $config({
  app(input) {
    return {
      name: "backoffice",
      removal: input.stage === "production" ? "retain" : "remove",
      protect: input.stage === "production",
      home: "aws",
      providers: {
        aws: {
          region: config.sstAws.region,
          profile: config.sstAws.profile,
        },
      },
    };
  },
  async run() {
    const outputs = [];

    await import("./infra/secrets");

    /**
     * databases
     */
    const { coreDynamo } = await import("./infra/databases/dynamo/core");

    /**
     * apps
     */
    const { backofficeNextjs } = await import("./infra/apps/backoffice");

    return [
      {
        region: config.sstAws.region,
        stage: config.sstStage,

        /**
         * databases
         */
        coreDynamo: {
          arn: coreDynamo.arn,
          name: coreDynamo.name,
        },

        /**
         * apps
         */
        backofficeNextjs: {
          url: backofficeNextjs.url,
        },
      },
    ]
      .concat(outputs)
      .reduce((acc, output) => Object.assign(acc, output), {});
  },
});
