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

### Application architecture

- Assign every handwritten production file to exactly one owner: App, Routes, a capability module, or Shared. Prefer the capability that owns the behavior; reuse alone does not make code Shared.
- App composes providers, the authenticated shell, global failures, and workflows spanning peer modules. Routes are thin TanStack Router adapters. Modules own vertical capabilities. Shared contains only domain-neutral infrastructure with no natural capability owner.
- App and Routes may depend on module public APIs and Shared. Modules may depend on Shared and peer modules only through their public APIs. Shared must not import App, Routes, or modules; modules must not import App or Routes. Cycles are forbidden.
- Every module exposes a deliberate public entry point. External consumers import that entry point and never module internals. Same-module internals may import each other directly.
- Domain code stays pure and transport-independent. Generated OpenAPI contracts, the base client, and generic transport/error handling live in Shared API infrastructure; only module data boundaries may consume generated contracts.
- Subdirectories express real responsibilities; do not create empty or one-file scaffolding merely to match a template.
- Generated output, shadcn-owned primitives, and mandatory TanStack route declarations are special cases, not capability owners. Any other exemption or compatibility export must be narrow, documented with a removal ticket, and removed when that ticket migrates its owner.

Temporary migration exceptions:

- Existing generated-contract imports in Project domain/types are removed by #556; Session, Server Activation, and Users imports by #557; Stack and Component imports by #558; Pipeline imports by #559; and Run plus mixed mapper-test imports by #560.
- The existing recursive Object Renderer file cycle is removed by #560.
- These exceptions permit only the imports already listed in `.oxlintrc.json`; they do not permit new transport dependencies, upward Shared dependencies, or module deep imports.

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
