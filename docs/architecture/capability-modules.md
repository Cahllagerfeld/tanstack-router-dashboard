# Capability-module architecture

This guide records the architecture agreed in [#257](https://github.com/Cahllagerfeld/tanstack-router-dashboard/issues/257). It is the detailed companion to the normative rules in `AGENTS.md`.

## Why capabilities own application code

The former technical-layer layout split one behavior among routes, features, data, domain types, components, hooks, and utilities. That made ownership unclear, encouraged deep imports, and let transport shapes leak into presentation code. Capability modules instead keep a product behavior's UI, orchestration, data adaptation, and pure domain concepts close enough to change and review together. This is an evolutionary destination, not a folder template to apply mechanically.

The initial capability owners are Projects, Components, Stacks, Pipelines, Users, Session, and Server Activation. Pipelines remain a first-class capability even when Project context scopes them. Session owns login, logout, current identity, and authentication guards; Users owns user administration. Runs and Artifacts receive modules only when corresponding product capabilities exist. There is no Dashboard catch-all module.

## The ownership test

Classify a file before placing or moving it:

1. Which product capability would change if this behavior changed? That capability owns it, even when several consumers reuse it.
2. Does it coordinate peer capabilities, establish application-wide policy, or assemble the shell? App owns it.
3. Is it required specifically by TanStack Router to declare, validate, guard, load, describe, or compose a route? Routes own that thin adapter.
4. Is it domain-neutral infrastructure that remains meaningful without Projects, Components, Stacks, Pipelines, Users, Session, or Server Activation? Only then may Shared own it.

When none of those answers is clear, keep the code with its current application owner until the relevant vertical migration can decide it. Do not use Shared as a holding area.

Examples:

| Code                                                                                 | Owner                                      | Reason                                                       |
| ------------------------------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------ |
| `Button`, generic responsive dialogs, a generic data table, `cn`, media-query hooks  | Shared                                     | Domain-neutral UI or utilities with no capability owner      |
| Generated OpenAPI declarations, base HTTP client, generic response/error decoding    | Shared API                                 | Transport infrastructure shared by capability data adapters  |
| Authenticated sidebar, providers, global error boundary, breadcrumbs                 | App                                        | Application composition or route-aware shell behavior        |
| Project switcher and persisted Project selection                                     | Projects                                   | Project-aware behavior has a natural capability owner        |
| Component-to-Stack presentation                                                      | Components consuming the Stacks public API | Reuse and collaboration do not erase either capability owner |
| A route's parameter schema, guard, loader/prefetch, metadata, and screen composition | Routes                                     | Framework adapter responsibilities                           |

Application-aware navigation, breadcrumbs, shell code, Project helpers, and entity-aware display code are never Shared merely because they are used globally.

## Source areas and dependency direction

The target handwritten production areas are:

```text
src/
  app/                 # composition root and cross-capability workflows
  routes/              # thin TanStack Router adapters
  modules/
    <capability>/
      index.ts          # deliberate public API
      ui/               # optional presentational UI and screens
      model/            # optional use-case hooks/providers and orchestration
      domain/           # optional pure concepts and rules
      data/             # optional transport adapters, queries, and mappers
  shared/
    api/                # generated contracts and generic transport infrastructure
    components/         # domain-neutral UI, including shadcn primitives
    hooks/              # domain-neutral hooks
    lib/                # domain-neutral utilities
```

Create only the responsibility directories a capability actually needs. A small module may consist of a public entry point and a few cohesive files.

Allowed dependency direction is downward toward stable contracts:

- App and Routes may consume module public APIs and Shared.
- A module may consume another module only through that module's public entry point, and may consume Shared.
- Shared must not consume App, Routes, or modules.
- Modules must not consume App or Routes.
- Circular dependencies are forbidden at every level.

External consumers import `@/modules/<capability>`, never `@/modules/<capability>/<internal-path>`. Inside one module, implementation files may use relative imports; internal barrels are not required. Workflows spanning peer modules belong in App rather than making one capability coordinate another.

## Module anatomy and data boundary

Responsibilities are semantic, not mandatory folders:

- **UI** renders state and invokes supplied actions. It does not own mutations, navigation, notifications, storage, or transport mapping.
- **Model/use-case orchestration** owns forms, mutations, cache coordination, navigation, notifications, storage, and other side effects.
- **Domain** contains transport-independent types and pure rules. It has no React, UI, API calls, React Query, generated DTOs, navigation, notifications, or storage effects.
- **Data** is the transport boundary. It owns requests, applicable generated DTO usage, query factories, and DTO-to-domain mapping.

Generated OpenAPI declarations, the base API client, and generic response/error handling are Shared API infrastructure. Only data boundaries may import generated contracts. Raw DTOs and transport-shaped pagination remain behind a data boundary; a module's public queries expose domain models and application-owned pagination contracts.

For example, a Projects data adapter may accept a generated Project response and return the module's `Project` domain model. A Projects screen imports the public query contract; it never imports the generated response type or base client.

## Routes and application composition

Routes may declare routes, validate search and path parameters, run guards, prefetch or load, provide metadata, and compose module-owned screens. Feature state and rendering stay outside route files so they can be tested without a router harness.

App owns bootstrap and providers, the authenticated shell, global error handling, and genuine cross-module workflows. The shell consumes module contracts instead of reaching into module internals. Server Activation, for example, authenticates through Session's public contract; App coordinates the two when the workflow spans both owners.

## Migration approach

Migrate complete, behavior-preserving vertical slices. Preserve route semantics, backend contracts, localization completeness, and user-visible behavior after each slice. Prefer existing test seams: Node tests for domain, mapping, query, and orchestration contracts; browser tests where DOM interaction matters. Do not add route harnesses or architecture-analysis tooling.

The dependency-aware sequence is:

1. [#555](https://github.com/Cahllagerfeld/tanstack-router-dashboard/issues/555): establish these rules and Shared UI/API infrastructure.
2. [#556](https://github.com/Cahllagerfeld/tanstack-router-dashboard/issues/556): migrate Projects as the representative module.
3. [#557](https://github.com/Cahllagerfeld/tanstack-router-dashboard/issues/557): migrate Session, Server Activation, and Users.
4. [#558](https://github.com/Cahllagerfeld/tanstack-router-dashboard/issues/558): migrate Stacks before Components and establish their public collaboration.
5. [#559](https://github.com/Cahllagerfeld/tanstack-router-dashboard/issues/559): migrate Project-scoped Pipelines as its own capability.
6. [#560](https://github.com/Cahllagerfeld/tanstack-router-dashboard/issues/560): finish App ownership, classify remaining code, and remove the legacy architecture.

## Temporary exceptions

Oxlint uses only its built-in restricted-import and cycle rules. A documented rule that Oxlint cannot safely express remains a review responsibility; do not replace it with a custom script or analysis tool.

The legacy `src/components`, `src/data`, `src/domain`, `src/features`, `src/hooks`, `src/lib`, and `src/types` areas are migration inputs, not target owners. Shared cannot import them. Data-boundary imports of Shared API infrastructure remain allowed under legacy `src/data` until their vertical migrations. Direct generated-contract imports outside data boundaries are baselined only for these existing files:

| Temporary files                                                                                                               | Removal ticket                                           |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `src/domain/projects.ts`, `src/types/projects.ts`                                                                             | #556                                                     |
| `src/domain/users.ts`, `src/types/user.ts`, `src/types/session.ts`, `src/types/server.ts`                                     | #557                                                     |
| `src/domain/components.ts`, `src/domain/flavors.ts`, `src/domain/stacks.ts`, `src/types/components.ts`, `src/types/stacks.ts` | #558                                                     |
| `src/domain/pipelines.ts`, `src/domain/pipelines.spec.ts`, `src/types/pipelines.ts`                                           | #559                                                     |
| `src/domain/runs.ts`, `src/domain/runs.spec.ts`, `src/types/runs.ts`                                                          | #560                                                     |
| `src/domain/mappers.spec.ts`, whose fixtures cover several legacy owners                                                      | #560 after its focused coverage has moved with #556–#559 |
| `src/shared/components/object-renderer/object-renderer.tsx` and `value-renderer.tsx` import each other                        | #560                                                     |

The generated-contract exceptions permit only the existing transport dependency; they do not grant Shared an upward dependency or permit module deep imports. The object-renderer exception disables only cycle detection for the two participants in that already-existing recursive renderer cycle. Each migration removes its obsolete exception. Any compatibility export kept while an unmigrated consumer still needs an old path must re-export only the migrated contract, name its removal ticket, and disappear no later than #560. Generated OpenAPI and Paraglide output, shadcn-owned primitive internals, and mandatory TanStack route declarations remain explicit special cases rather than handwritten ownership precedents.
