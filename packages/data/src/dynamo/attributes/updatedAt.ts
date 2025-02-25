import { StringAttribute } from "electrodb";

export const updatedAt = (options?: Partial<StringAttribute>) =>
  ({
    ...options,
    type: "string",
    watch: "*",
    required: true,
    default: () => new Date().toISOString(),
    set: () => new Date().toISOString(),
  }) satisfies StringAttribute;
