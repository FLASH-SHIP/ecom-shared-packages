import { router } from "@ecom/trpc-contract/server/trpc";
import { addCheckpoint, get, list, recalculate, updateStatus } from "./procedures/orders.handler";

export const adminOrdersRouter = router({
  list,
  get,
  updateStatus,
  addCheckpoint,
  recalculate,
});

export type AdminOrdersRouter = typeof adminOrdersRouter;
