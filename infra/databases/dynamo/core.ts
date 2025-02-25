import { isPermanentStage, isProductionStage } from "../../../stage";

export const coreDynamo = isPermanentStage
  ? new sst.aws.Dynamo(
      "CoreDynamo250211",
      {
        fields: {
          pk: "string",
          sk: "string",
          gsi1pk: "string",
          gsi1sk: "string",
        },
        primaryIndex: { hashKey: "pk", rangeKey: "sk" },
        globalIndexes: {
          "gsi1pk-gsi1sk": {
            hashKey: "gsi1pk",
            rangeKey: "gsi1sk",
          },
        },
      },
      {
        retainOnDelete: isProductionStage,
      }
    )
  : sst.aws.Dynamo.get(
      "CoreDynamo250211",
      "backoffice-development-CoreDynamo250211Table"
    );
