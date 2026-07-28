import { middleware } from "@ecom/trpc-contract/server/init";

export function auditLog(_opts: { module: string; action: string; entityType: string }) {
  return middleware(async ({ next }) => {
    return next();
  });
}
