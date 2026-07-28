import { router } from "@ecom/trpc-contract/server/trpc";
import { create, get, list, remove, update } from "./procedures/packing.handler";

export const packingRouter = router({
  list,
  get,
  create,
  update,
  delete: remove,
});
