import { router } from "@ecom/trpc-contract/server/trpc";
import { bulkSet, get, getAll, getMany, remove, set } from "./procedures/settings.handler";

export const settingsRouter = router({
  getAll,
  get,
  getMany,
  set,
  bulkSet,
  remove,
});
