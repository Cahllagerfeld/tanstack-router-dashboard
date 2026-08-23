# ADR 0001: Internationalize application-owned copy with Paraglide

## Status

Accepted

## Context

The dashboard has application-owned copy alongside runtime data from the ZenML API. Hard-coded copy makes the interface English-only and lets new untranslated strings enter the product without a consistent naming or review policy.

## Decision

- Use Paraglide for every application-owned user-facing string, with complete English and German catalogs. English is the base locale; retain the existing browser-preferred-language behavior and English fallback without adding a language selector.
- Treat user-entered values and arbitrary API-provided data, including raw API errors, as runtime data. Render that data unchanged, but translate every application-owned label and wrapper around it.
- Keep message catalogs flat. Use stable, semantic, lowercase snake-case keys: `common_<category>_<intent>` for context-invariant short copy and `<owner>_<surface>_<purpose>` for owned copy. Do not use nested JSON, dotted keys, catch-all owners, or copy-derived keys.
- Use the glossary's domain owners where applicable: Projects, Components, Stacks, Pipelines, Runs, and Artifacts. Reuse a key only when its meaning and translations are invariant in every context; otherwise create an owner-specific key.
- Put dynamic values, pluralization, and locale-dependent grammar in one parameterized message. Do not concatenate translated fragments. Use Paraglide markup for translated content that contains inline links or emphasis, and Paraglide locale-aware formatting for user-visible dates, times, quantities, and numbers.
- Keep the catalogs key-complete and require proficient German review before merge. Rename existing messages to the convention during the migration.
- Prevent regressions with one lightweight, blocking localization-policy unit test. It verifies catalog parity and reports direct JSX text, literal user-facing attributes, and direct notification copy. Narrow, reasoned inline exemptions are permitted.

## Consequences

The dashboard presents application-owned copy consistently in English and German. The policy gives agents a stable way to find, name, and add messages while preserving API data faithfully. The migration and policy check add maintenance work whenever new product copy is introduced.
