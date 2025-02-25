import { Entity } from "electrodb";
import { createdAt } from "../../../attributes/createdAt";
import { updatedAt } from "../../../attributes/updatedAt";
import { config, service } from "../config";

export const account = new Entity(
  {
    model: {
      entity: "account",
      version: "1",
      service,
    },
    attributes: {
      id: {
        type: "string",
        required: true,
      },
      username: {
        type: "string",
        required: true,
      },
      createdAt: createdAt(),
      updatedAt: updatedAt(),
    },
    indexes: {
      byId: {
        pk: {
          field: "pk",
          composite: ["id"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
    },
  },
  config
);
