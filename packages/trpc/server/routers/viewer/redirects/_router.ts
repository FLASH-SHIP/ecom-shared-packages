import { router } from "@ecom/trpc-contract/server/trpc";
import { create, list, remove, update } from "./procedures/redirects.handler";

export const redirectsRouter = router({ list, create, update, remove });
