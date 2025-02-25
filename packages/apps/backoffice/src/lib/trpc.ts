import { createTRPCReact } from "@trpc/react-query";
import type { Router } from "../trpc/router";

export const trpc = createTRPCReact<Router>();
