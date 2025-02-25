import { t } from "./t";

export const router = t.router({
  hello: t.procedure.query(() => "world"),
});

export type Router = typeof router;
