import { router } from "@ecom/trpc-contract/server/trpc";
import { getBySlug, list } from "./procedures/pages.handler";

export const publicPagesRouter = router({
  list,
  getBySlug,
});
