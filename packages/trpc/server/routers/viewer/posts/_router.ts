import { router } from "@ecom/trpc-contract/server/trpc";
import {
  archive,
  bulkArchive,
  bulkDelete,
  bulkPublish,
  bulkRestore,
  clone,
  create,
  get,
  list,
  permanentlyDelete,
  publish,
  remove,
  restore,
  update,
} from "./procedures/posts.handler";

export const postsRouter = router({
  list,
  get,
  create,
  update,
  publish,
  archive,
  clone,
  remove,
  restore,
  permanentlyDelete,
  bulkDelete,
  bulkPublish,
  bulkArchive,
  bulkRestore,
});
