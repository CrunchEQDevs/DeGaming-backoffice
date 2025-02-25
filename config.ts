import { dynamic, enums, literal, mask, object, string } from "superstruct";

const env = mask(
  process.env,
  object({
    SST_AWS_PROFILE: dynamic((_, ctx) =>
      ctx.branch[0].GITHUB_ACTIONS
        ? literal(undefined)
        : enums([
            "degaming-development",
            "degaming-staging",
            "degaming-production",
          ])
    ),
    SST_AWS_REGION: enums(["eu-central-1"]),
    SST_STAGE: string(),
  })
);

export const config = {
  sstAws: {
    region: env.SST_AWS_REGION,
    profile: env.SST_AWS_PROFILE,
  },
  sstStage: env.SST_STAGE,
};
