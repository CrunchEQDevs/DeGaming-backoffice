import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { EntityConfiguration } from "electrodb";
import { Resource } from "sst";

export const service = "core";

export const config = {
  client: new DynamoDBClient(),
  table: Resource.CoreDynamo250211.name,
} satisfies EntityConfiguration;
