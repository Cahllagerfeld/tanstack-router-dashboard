# Detail Screens

A **Detail Screen** presents one record through `DetailLayout` in `src/shared/components/detail-layout.tsx`. The Component screen is the reference implementation: `src/features/components/detail/` plus `src/routes/(private)/_sidebar/infra/components/$component_id/`.

## Anatomy

From top to bottom:

1. **Header**: name, copyable ID, and optional media and tags.
2. **Fact strip**: up to six scalar facts about the record.
3. **Tabs**: sticky, and each one is a child route.
4. **Tab body**: full width, with each tab setting its own padding.

## Build one

1. Choose the tabs. The record's main content comes first and is the `index` route, then relations. One tab per distinct view or relation. Name a tab after its content. When several small settings groups exist, such as configuration, environment, and labels, they share one **Settings** tab where empty groups shrink to a line.
2. Choose up to six facts: the ones people use to recognize the record.
3. Add `<Owner>DetailLayout` in the owner's behavior folder, passing facts and tabs to `DetailLayout`. Export it from `ui.ts`.
4. In `$<owner>_id/route.tsx`, load the record with `ensureQueryDataOr404`, prefetch any counted relation, and render `<Owner>DetailLayout` around `<Outlet />`. Pass counts as plain numbers, which keeps the owner free of a peer edge.
5. Give each tab its own child route that owns its loader. A relation tab composes the peer's public list, as `stacks.tsx` does with `RelatedStackList`.
6. Add `pendingComponent` built on `DetailLayoutSkeleton`, and `notFoundComponent`.

The screen is done when every tab has a URL, a reload keeps the tab, an empty record still shows every tab, and `docs/agents/detail-screens.md` still describes what you built.

## Rules

- Tabs are fixed per entity type, so they hold their position between records. An empty tab renders an empty state.
- A fact never repeats the header or a tab count.
- Show counts only on tabs holding a list, and only when the count is cheap to load.
- Tables run edge to edge. Other tab bodies use `ContentInset`, with no cards.
- Render environment variable keys verbatim. `ObjectRenderer` title-cases keys, so it suits configuration only.
- `DetailLayout` takes slots and stays free of entity knowledge. Each new slot, such as actions, status, or description, arrives with the first screen that needs it.

## Open question

A tab body with its own pan and zoom, such as the snapshot step graph, may fight the page scroll. Prototype that body with a real graph before settling how it takes its height.
