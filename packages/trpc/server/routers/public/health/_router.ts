import { checkHealth } from "@ecom/features/health/HealthCheckService";
import { publicProcedure, router } from "@ecom/trpc-contract/server/trpc";

export const healthRouter = router({
  check: publicProcedure.query(async () => {
    return checkHealth();
  }),
});
