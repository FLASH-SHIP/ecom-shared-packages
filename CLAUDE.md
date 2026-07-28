# Shared Packages Development Guide for AI Agents & Developers (`ecom-shared-packages`)

You are working in the dedicated shared packages repository for the Ecom Express system. This repository contains all shared UI components, API contracts, i18n translations, types, and utility libraries used across the Ecom ecosystem.

## Core Directives

- **Zero App Logic**: Never place app-specific business logic or database queries inside shared packages. Shared packages must remain pure, modular, and reusable.
- **Type Safety**: Enforce strict TypeScript types (`strict: true`). Never use `any` or `@ts-ignore`.
- **Subpath Package Imports**: Always export subpath entry points via `package.json` `exports` field (e.g. `@ecom/ui`, `@ecom/ui/domain`, `@ecom/trpc-contract/customer`).
- **Private Registry & Local DX**: All packages are published to GitHub Packages (`@ecom/*`) and linked locally during development using `yalc`.

---

## 8 Shared Packages Overview

1. **`packages/ui` (`@ecom/ui`)**: Core Design System primitives (`Button`, `Modal`, `Table`, `Input`) & Business Components (`@ecom/ui/domain`).
2. **`packages/trpc` (`@ecom/trpc-contract`)**: Type-safe API routers & Zod DTO schemas for Customer and Admin APIs.
3. **`packages/i18n` (`@ecom/i18n`)**: Centralized translation JSONs (`locales/vi/*.json`, `locales/en/*.json`).
4. **`packages/lib` (`@ecom/lib`)**: Shared utilities for JWT, Crypto, Redis cache, Logger, and error formatting.
5. **`packages/types` (`@ecom/types`)**: Pure TypeScript interfaces and types.
6. **`packages/config` (`@ecom/config`)**: System-wide shared environment configurations.
7. **`packages/emails` (`@ecom/emails`)**: Transactional email templates.
8. **`packages/tsconfig` (`@ecom/tsconfig`)**: Base TypeScript configuration presets (`base.json`, `nextjs.json`, `nestjs.json`).

---

## Key Commands

```bash
# Build all packages via Turborepo
yarn build

# Run TypeScript type-checking across all packages
yarn type-check

# Publish all packages to local yalc store for instant local testing
yarn yalc:publish:all

# Run migration & cleanup scripts
yarn script:migrate-ui
yarn script:cleanup-ui
```

---

## Git & Release Workflow

1. **Branching**: Create feature branches (`feat/`, `fix/`, `refactor/`).
2. **Release**: GitHub Actions (`.github/workflows/publish-shared-packages.yml`) automatically builds, type-checks, and publishes `@ecom/*` packages to GitHub Packages (`npm.pkg.github.com`) upon push to `main`.
