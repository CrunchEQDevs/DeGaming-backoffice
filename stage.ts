export const stage = $app.stage;

export const isProductionStage = $app.stage === "production";
export const isStagingStage = $app.stage === "staging";
export const isDevelopmentStage = $app.stage === "development";

export const isPermanentStage = [
  "production",
  "staging",
  "development",
].includes($app.stage);
