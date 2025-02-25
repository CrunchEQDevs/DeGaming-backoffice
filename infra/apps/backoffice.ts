import { config } from "../../config";
import {
  isDevelopmentStage,
  isProductionStage,
  isStagingStage,
} from "../../stage";
import { coreDynamo } from "../databases/dynamo/core";
import { variables } from "../variables";
import { zone } from "../zone";

export const backofficeNextjs = new sst.aws.Nextjs("BackofficeNextjs250205", {
  path: "packages/apps/backoffice",
  domain: {
    name: isProductionStage
      ? `backoffice.${config.sstAws.region}.aws.degaming.net`
      : isStagingStage
      ? `backoffice.staging.${config.sstAws.region}.aws.degaming.net`
      : isDevelopmentStage
      ? `backoffice.dev.${config.sstAws.region}.aws.degaming.net`
      : `backoffice.${$app.stage}.dev.${config.sstAws.region}.aws.degaming.net`,
    dns: sst.aws.dns({
      zone,
    }),
  },
  environment: {
    API_URL: variables.apiUrl,
  },
  link: [coreDynamo],
});
