import { Service } from "electrodb";
import { config } from "./config";
import { account } from "./models/account";

export const entities = {
  account,
};

export const core = new Service(entities, config);
