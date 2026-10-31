## Agent skills

### Project toolchain

This repository uses devenv. Run project-provided tools through devenv:

- `devenv shell -- gh ...`
- `devenv shell -- node ...`
- `devenv shell -- pnpm ...`

Do not assume these tools are installed globally.

### Issue tracker

GitHub Issues via `gh`; external PRs are not a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical defaults: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `CONTEXT.md` + `docs/adr/`. See `docs/agents/domain.md`.

### Architecture

Handwritten code has four areas: `src/app`, `src/routes`, `src/features`, and `src/shared`. `tools/architecture/policy.js` registers owners and Shared units. #257 is the full specification, and ADR-0002 records why.

Features share one shape: `index.ts` and `ui.ts` ports when a consumer needs them, `model.ts`, `data/{dto,requests,map,queries}.ts`, and behavior folders.

#### Placement procedure

1. Generated output and TanStack declarations keep their designated locations. Create a capability folder only when it has code.
2. Choose the registered feature owner. Put DTO, HTTP, mapping, and query work in `data/{dto,requests,map,queries}.ts`. Generated imports enter only through `dto.ts`. Public inputs and pure rules go in `model.ts`. An input that mirrors a request derives from `ApiQuery` or `ApiBody` in `shared/api/client.ts`. DTO aliases stay private.
3. Name behavior folders in kebab-case, one level deep, such as `create`, `selection`, or `settings`. A behavior folder holds `model.ts`, `schema.ts`, `storage.ts`, `use-*.ts`, descriptive `.tsx` views, and colocated tests; `utils.ts`, `helpers.ts`, and `types.ts` are not allowed. A new behavior needs no registry edit. Add a named data subresource only when real size or responsibility justifies extending the grammar.
4. Export through the ports described below.
5. Neutral reusable code goes to Shared. Capability-aware code stays with its owner even when reused. Only a new top-level unit under `shared/components` or `shared/lib` needs a registry entry. `shared/ui` stays generator-owned.
6. App is a closed list: `providers.tsx`, `query-client.ts`, `global-error-boundary.tsx`, `layouts`, `navigation`, and `workflows`. A workflow coordinates state or effects across owners and does not warehouse relation pages.
7. Routes own declarations, input validation, guards, loaders and prefetching, metadata, and small composition adapters. They compose public screens through props and slots. Feature-owned screen, query, and form setup lives with its owner.

#### Ports

- `ui.ts` exports every hook, plus screens, dialogs, other views, and anything else defined in a `.tsx` file.
- `index.ts` exports plain functions, types, query factories, and models, and stays free of UI.
- External consumers import only `@/features/<owner>` or `@/features/<owner>/ui`.
- Files inside a feature import implementations directly, never through their own ports.
- Add a port or export when a consumer needs it.
- Ports stay tree-shakable: `package.json` `sideEffects` treats source modules as pure. The production build silently drops a bare non-CSS import such as `import "./x"`, so add any module that needs an import-time effect to `sideEffects`.

#### Relationship procedure

Take the first step that fits:

1. A navigation link uses a typed route string, with no import of the destination feature.
2. An embedded API resource is a snapshot. Map it locally to the minimum the screen needs, as `authorName` does for Runs. It never justifies a peer edge or an extra query. Reuse canonical permission or lifecycle behavior only when that is what the screen needs.
3. For an independently refreshed widget, compose public contracts in the route, passing ids and slots. The route prefetches each owner's query, and widget-local state stays with its owner. Relation tabs with their own loader or state normally fit here.
4. A stateful operation coordinating several owners, with combined failure handling, belongs in `app/workflows`.
5. A one-way peer import through public ports is allowed when cohesive. If it would close a cycle, compose in the route.

#### Invariants

- Shared imports only Shared and generated Paraglide output. Features import features through ports and Shared, never App or routes.
- Imports form no cycles, including type-only imports. The only exception is the `ObjectRenderer` and `ValueRenderer` recursion.
- Fix an architecture finding at its cause. `src` adds no suppression directives; the two `react/set-state-in-effect` directives are the only exceptions.
- Session owns `CurrentIdentity`, Users owns the administrative `User`, and consumers own their embedded summaries.
- The strict grammar, DTO funnel, and pure-model rules apply to every owner.
- Adding an owner or Shared unit is ordinary review. Checker and CI changes need explicit maintainer review.

#### Commands

- `pnpm lint`: non-fixing architecture and code lint, as in CI. `pnpm lint:fix` applies fixes.
- `pnpm lint:directives`: reject suppression directives in handwritten `src`.
- `pnpm test:architecture`: rule and CLI fixtures.

### Internationalization

All application-owned user-facing strings must use Paraglide messages and have both English and German translations. Do not add hard-coded user-facing copy.

- Translate labels, headings, descriptions, button text, accessibility text, validation messages, notifications, and route metadata.
- Keep user-entered values, arbitrary API data, and raw API error details unchanged; translate only application-owned labels and wrappers around them.
- Add flat, semantic, lowercase `snake_case` keys. Use `common_<category>_<intent>` only for invariant short copy; otherwise use the owning surface, such as `projects_<surface>_<purpose>`.
- Reuse a message key only when its meaning and translation are invariant across contexts; otherwise add an owner-specific key.
- Keep dynamic values, pluralization, grammar, and locale-sensitive dates, times, quantities, and numbers inside Paraglide messages or locale-aware formatters. Do not concatenate translated fragments.
- Keep `messages/en.json` and `messages/de.json` key-complete and run the localization policy test when adding copy.

### UI primitives

If a shadcn primitive exists for the UI element needed, always use the shadcn one. Do not build a custom equivalent when a shadcn component already covers it. If not installed, install it.

### Forms

Always handle forms with Zod schemas, React Hook Form (`useForm` + `zodResolver`), and the shadcn `Field` primitives (`Field`, `FieldLabel`, `FieldError`, `FieldGroup`, etc.) wired via `Controller`. Do not roll custom form state or validation when this stack covers it.

### Separation of concerns

Do not mix business logic with display. Keep components presentational and easy to test: put mutations, form setup, validation handlers, and side effects in hooks or providers; leave UI components to render props/state and call actions. Prefer the existing pattern of a display component plus a dedicated hook (e.g. `form.tsx` + `use-*-form.ts`). Cover the business logic with unit tests.

### Testing

Add tests alongside new feature development and bug fixes. For the existing test backlog, work risk-first in small, independently green slices rather than pursuing one test per file or 100% coverage.

- Test application-owned behavior at the highest practical existing seam. Prefer Node tests for business logic, data functions, mutations, query contracts, domain mappers, schemas, error handling, loader utilities, and side-effect orchestration.
- Use Vitest Browser only when DOM behavior matters, such as forms, dialogs, validation feedback, visibility controls, filters, tables, and other meaningful user interactions.
- Mock external boundaries such as the API client, navigation, storage, and notifications at the module boundary. Do not add MSW unless the project's testing strategy is explicitly revisited.
- Cover the normal path plus credible failures and meaningful boundary conditions. Add an edge-case test when it represents a realistic user or API state, protects a security or data-loss boundary, or reproduces a defect.
- Assert observable behavior, outputs, side effects, and contracts. Avoid implementation-detail assertions, broad DOM snapshots, duplicate assertions across layers, and abstractions introduced before setup is demonstrably repeated.
- Do not add route-level tests or a router test harness under the current strategy. Extract and test reusable non-route business logic only when doing so improves the production design independently of the test.
- It is acceptable to leave generated code, shadcn primitives, type-only modules, re-export barrels, trivial route wiring, static skeletons, and display-only components without direct tests.
- Do not add coverage tooling or percentage thresholds merely to drive the number upward. The stopping condition is meaningful protection of identified high-risk behavior, not universal file coverage.
- Behavior-preserving refactors are allowed when needed to create a clean test seam. Fix clear defects discovered during test work and add regression coverage; escalate ambiguous product behavior instead of encoding an assumption.
- Keep the complete CI test suite comfortably below roughly three minutes. Treat slow startup and flaky browser tests as defects.

### Temp files

If the agent creates any temporary files while working, clean them up afterwards. Do not leave temp files in the workspace.
