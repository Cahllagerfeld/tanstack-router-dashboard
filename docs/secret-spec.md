# Secrets Feature

Build the secrets feature with the following steps and requirements.

## Context

This dashboard is a React 19 app using TanStack Router (file-based routing), TanStack React Query, TypeScript (strict), Tailwind CSS v4, and shadcn/ui components. Bun is the package manager.

### Relevant Codebase Patterns

- **Routing:** File-based routes under `src/routes/(private)/_sidebar/`. Settings routes live at `src/routes/(private)/_sidebar/settings/`. The settings layout (`route.tsx`) renders a tab bar with `<Outlet />`. Each setting page is a separate file (e.g. `members.tsx`).
- **Domain types:** Defined in `src/domain/<resource>.ts`. Export an internal type and a `<resource>FromApi` mapping function from the OpenAPI schema type (`components["schemas"]["…"]` from `@/types/core`).
- **Data layer:** Queries live in `src/data/<resource>/index.ts` using `queryOptions` from TanStack Query. Mutations live in `src/data/<resource>/mutations/<action>-<resource>.ts` as hooks using `useMutation`.
- **API client:** `apiClient` from `@/data/api-client` — call like `apiClient.GET("/api/v1/secrets", { params: { query: … } })`. Paths must match those in `src/types/core.ts`.
- **Auth guard:** Routes call `requireAuth(queryClient)` in `beforeLoad`.
- **Code splitting:** `autoCodeSplitting: true` in vite config — no `.lazy.tsx` files needed.
- **Tests:** Vitest for unit tests on pure business logic functions. No tests needed for things TypeScript already enforces.

### API Schema (from `src/types/core.ts`)

```
GET    /api/v1/secrets                  → Page_SecretResponse_
POST   /api/v1/secrets                  → SecretResponse
GET    /api/v1/secrets/{secret_id}      → SecretResponse
PUT    /api/v1/secrets/{secret_id}      → SecretResponse  (body: SecretUpdate)
DELETE /api/v1/secrets/{secret_id}      → 204
```

Key schema types:

- `SecretResponse` — `id`, `name`, `permission_denied`, `body?: SecretResponseBody`
- `SecretResponseBody` — `created`, `updated`, `user_id`, `private`, `values?: Record<string, unknown>`
- `SecretRequest` — `name`, `private`, `values?`
- `SecretUpdate` — `name?`, `private?`, `values?`

The `values` field is a `Record<string, unknown>` — each key is a secret key name and each value is the secret key value. Treat all values as confidential (masked by default in the UI).

## Explanation

The feature lives inside **Server Settings** as a new **"Secrets"** tab alongside the existing General and Members tabs.

1. Secrets are fetched from the secrets endpoint.
2. Each secret can contain multiple keys (stored in `values`).
3. Key values are confidential — never show them in plain text by default; provide a toggle to reveal.

## Features

1. **Domain type** — Create `src/domain/secrets.ts`:
   - Internal `Secret` type with mapped, app-friendly field names.
   - `secretFromApi(apiSecret: SecretResponse): Secret` mapping function.
   - Unit-testable pure logic: e.g. `maskSecretValues(values)` that returns the same keys but replaces each value with `"••••••"`. Write Vitest unit tests for this function.

2. **Data layer** — Create queries and mutations under `src/data/secrets/`:
   - `index.ts` — `secretQueries.list(params?)` and `secretQueries.detail(id)` using `queryOptions`.
   - `mutations/create-secret.ts` — `useCreateSecret` hook.
   - `mutations/update-secret.ts` — `useUpdateSecret` hook (used for both renaming and key management).
   - `mutations/delete-secret.ts` — `useDeleteSecret` hook.

3. **Route: Secrets list** — `src/routes/(private)/_sidebar/settings/secrets.tsx`:
   - Add a **"Secrets"** tab to the settings layout (`route.tsx`).
   - `requireAuth` in `beforeLoad`.
   - Prefetch secrets list in `loader` using `ensureQueryData`.
   - Display a list/table of secrets (name, number of keys, created date).
   - "New Secret" button opens a create dialog.
   - Each row has a "Delete" action (with confirmation).
   - Clicking a secret navigates to the detail route.

4. **Route: Secret detail** — `src/routes/(private)/_sidebar/settings/secrets.$secretId.tsx`:
   - `requireAuth` in `beforeLoad`.
   - Prefetch secret detail in `loader`.
   - Show secret name (editable inline or via a dialog).
   - Show all keys in a table. Each row:
     - Key name (visible).
     - Key value (masked by default, show/hide toggle per row).
     - Delete key button (triggers an update mutation that removes the key from `values`).
   - "Add Key" button to add a new key-value pair (reveals an inline form row or dialog).

5. **Create secret dialog** — name + optional initial key-value pairs. On success: invalidate `secretQueries.baseKey`, toast, navigate to detail.

6. **Update secret** — covers two cases:
   - Rename: PATCH `name` field.
   - Key management: PATCH `values` (add key, delete key = send updated values map without that key).

7. **Delete secret** — confirmation prompt, on success: invalidate list, toast, navigate back to `/settings/secrets`.

## Definition of Done

### Functionality

- [ ] Secrets list page renders under `/settings/secrets` and is accessible via the Settings tab bar.
- [ ] List shows secret name, key count, created date.
- [ ] Create secret: form validates (name required), submits to API, invalidates list, shows success toast, navigates to detail.
- [ ] Detail page shows all keys. Values are masked (`••••••`) by default; a per-row toggle reveals the raw value.
- [ ] Add key: appends a new entry to `values` via update mutation.
- [ ] Delete key: removes entry from `values` via update mutation, no full page reload.
- [ ] Rename secret: updates `name` via update mutation.
- [ ] Delete secret: confirmation dialog, deletes, invalidates list, navigates back.
- [ ] 401 errors are handled globally (existing pattern — no extra handling needed).

### Code Quality

- [ ] `Secret` domain type and `secretFromApi` exist in `src/domain/secrets.ts`.
- [ ] `maskSecretValues` (or equivalent) is a pure function with Vitest unit tests covering: empty values, single key, multiple keys.
- [ ] Queries follow the existing `queryOptions` pattern in `src/data/secrets/index.ts`.
- [ ] Mutations follow the existing `useMutation` + invalidation + toast pattern.
- [ ] No secrets-related logic in route files beyond wiring (loaders, navigation).
- [ ] `bun run check:types` passes with no new errors.
- [ ] `bun run lint` passes.
- [ ] `bun run test:unit` passes (including new secret tests).

### UI / UX

- [ ] The Secrets tab appears in the Settings tab bar alongside General and Members.
- [ ] Key values are never visible by default; there is a visible toggle (e.g. eye icon) per row.
- [ ] Loading states use `<Suspense>` + skeleton components consistent with the rest of the app.
- [ ] Destructive actions (delete secret, delete key) have a confirmation step.
- [ ] Success and error states surface via toast notifications.

### Out of Scope

- Secrets backup / restore operations (`/api/v1/secrets_operations/*`).
- Workspace-scoped secrets endpoint (`/api/v1/workspaces/.../secrets`).
- Bulk operations.
