import { StringAttribute } from "electrodb";

export const createdAt = (options?: Partial<StringAttribute>) =>
  ({
    ...options,
    type: "string",
    required: true,
    readOnly: true,
    default: () => new Date().toISOString(),
    set: () => new Date().toISOString(),
  }) satisfies StringAttribute;
