import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { router } from "../../../../trpc/router";

async function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router,
  });
}

export { handler as GET, handler as POST };
