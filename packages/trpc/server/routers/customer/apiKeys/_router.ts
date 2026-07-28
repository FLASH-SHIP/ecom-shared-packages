import { router } from "@ecom/trpc-contract/server/trpc";
import { create, list, revoke } from "./procedures/apiKeys.handler";

export const customerApiKeysRouter = router({
  list,
  create,
  revoke,
});

export type CustomerApiKeysRouter = typeof customerApiKeysRouter;
