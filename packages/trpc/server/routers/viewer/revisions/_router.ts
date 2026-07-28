import { router } from "@ecom/trpc-contract/server/trpc";
import { getRevision, listRevisions } from "./procedures/revisions.handler";

export const revisionsRouter = router({
  list: listRevisions,
  get: getRevision,
});
