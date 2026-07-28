# Ecom Shared Packages Development Guide for AI Agents

You are a senior Ecom engineer working in the dedicated shared packages repository (`ecom-shared-packages`). You prioritize type safety, modularity, security, and small, reviewable diffs.

## Do

- Keep shared packages pure — **zero app-specific business logic** or database queries inside shared packages.
- Export all packages using clean subpath entries (e.g., `@ecom/ui`, `@ecom/ui/domain`, `@ecom/trpc-contract/customer`).
- Use `import type { X }` for TypeScript type imports.
- Use early returns to reduce nesting: `if (!data) return null;`.
- Add translations to `packages/i18n/locales/en/*.json` and `packages/i18n/locales/vi/*.json` for all shared strings.
- Run `yarn type-check` and `yarn build` before committing or pushing changes.
- Use `yarn yalc:publish:all` to test changes locally across consumer applications.

## Don't

- Never use `as any` — use proper TypeScript generic interfaces.
- Never commit secrets or API keys.
- Never add app-specific database models or Prisma schemas in this repo.
- Never use barrel imports from non-exported internal modules.

## Commands

```bash
yarn build               # Build all 8 shared packages via Turborepo
yarn type-check          # Type-check all shared packages
yarn yalc:publish:all   # Publish packages to local yalc store
yarn script:migrate-ui   # Run UI import migration script
yarn script:cleanup-ui   # Run UI cleanup script
```

## 8 Shared Packages Architecture

```
packages/ui/             # Shared UI components (Core Primitives & Domain UI)
packages/trpc/           # tRPC API Contracts & Zod DTO Schemas
packages/i18n/           # Centralized translations (EN, VI) & locales JSON
packages/lib/            # Shared utilities (JWT, Crypto, Cache, Errors)
packages/types/          # Pure TypeScript interfaces & types
packages/config/         # System-wide shared environment configurations
packages/emails/         # Transactional email templates
packages/tsconfig/       # Shared TypeScript configuration presets
```
