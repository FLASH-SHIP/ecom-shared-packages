import { router } from "@ecom/trpc-contract/server/trpc";
import { getActive, getDefault } from "../../viewer/languages/procedures/languages.handler";

export const publicLanguagesRouter = router({
  getActive,
  getDefault,
});
