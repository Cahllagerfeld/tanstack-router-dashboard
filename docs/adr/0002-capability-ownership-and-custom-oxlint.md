# ADR 0002: Own code by capability and enforce it with custom Oxlint rules

## Status

Accepted

## Context

Handwritten code spreads one capability across routes, features, data access, domain types, components, hooks, and utilities. At `30627e9`, all 27 production imports of feature code from outside a feature were deep imports. Agents and maintainers cannot reliably answer which capability owns a change, what another capability may import, or where a new file belongs. `@/components` also collides with the product Component at `@/features/components`.

An earlier decision enforced architecture with built-in Oxlint rules only. Built-in import restrictions match specifier text, so the attempt in #561 restricted the `@/` alias and missed relative imports. They also cannot express owners, layers, or a placement grammar.

## Decision

- Organize handwritten code into four roots: `src/app`, `src/routes`, `src/features`, and `src/shared`. Keep the name `features`, because a rename to `modules` changes paths without improving placement. Consolidate neutral code under `shared`, which ends the Component collision permanently.
- Give every feature two ports: `index.ts` for models, queries, and plain commands, and `ui.ts` for hooks and views. The rule is cheap and deterministic, and keeps UI out of route loaders. In controlled builds at `30627e9`, the Projects split saved 126,981 JS bytes on the entry-plus-login path and added 2,597 bytes on the entry-plus-private-shell path, so this is not a performance win for signed-in users.
- Declare source modules free of side effects through `package.json` `sideEffects`, keeping only CSS and `src/main.tsx`. Route files import not-found and pending views statically, so without this a `ui.ts` barrel pulls its table and tab modules into the entry chunk: at #555 the entry closure grew 25%, from 629,287 to 786,490 bytes, and the declaration restored it exactly.
- Reverse the built-in-only decision. Keep built-in `import/no-cycle`, and add `public-feature-imports`, `dependency-direction`, and `file-placement` in a small local plugin at `tools/architecture`, loaded through `jsPlugins`. The rules resolve alias and relative specifiers to repository paths and classify them with one shared classifier.
- Count type-only imports as cycles, so reciprocal feature edges fail even when they erase at build time.
- Ratchet instead of keeping a baseline. Public ports, dependency direction, and cycles apply globally from day one. Placement requires a registered owner and accepts named legacy paths until an owner joins `enforcedOwners`. Both lists disappear when the migration ends.
- Reject suppression tokens in handwritten `src` with a standalone guard, because a whole-file directive would silence the rules in that same file.

## Consequences

Oxlint JS plugins are alpha and outside semver, and they have no type checker or shared module graph. We accept that risk for a small rule set and contain it: Oxlint stays pinned, rule fixtures and CLI fixtures run on every pull request including Renovate upgrades, and a plugin load failure fails the job. The rules use only syntax and file paths, and cycles stay with the built-in rule.

The `sideEffects` declaration has a hazard: the production build silently drops a bare non-CSS import such as `import "./x"`, and nothing fails in development or tests, where the module still runs. A module that needs an import-time effect must be added to `sideEffects`. A breaking Oxlint upgrade may require plugin changes before it can merge.

The checks guard against mistakes and are not a security boundary. A closed grammar cannot infer business ownership, so an unnecessary behavior folder or product logic in a neutrally named Shared file still needs review. The first ports are export rewrites, not finished encapsulation; the capability migrations complete that work.
