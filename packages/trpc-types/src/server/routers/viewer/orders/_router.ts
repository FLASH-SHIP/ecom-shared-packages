import { router } from "../../../trpc";
import { addCheckpoint, get, list, purchaseLabel, recalculate, reconcilePayment, updateStatus, voidLabel } from "./procedures/orders.handler";

export const adminOrdersRouter = router({
  list,
  get,
  updateStatus,
  addCheckpoint,
  recalculate,
  purchaseLabel,
  voidLabel,
  reconcilePayment,
});

export type AdminOrdersRouter = typeof adminOrdersRouter;
