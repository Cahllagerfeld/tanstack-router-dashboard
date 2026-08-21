## Agent skills

### Issue tracker

GitHub Issues via `gh`; external PRs are not a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical defaults: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `CONTEXT.md` + `docs/adr/`. See `docs/agents/domain.md`.

### UI primitives

If a shadcn primitive exists for the UI element needed, always use the shadcn one. Do not build a custom equivalent when a shadcn component already covers it. If not installed, install it.

### Forms

Always handle forms with Zod schemas, React Hook Form (`useForm` + `zodResolver`), and the shadcn `Field` primitives (`Field`, `FieldLabel`, `FieldError`, `FieldGroup`, etc.) wired via `Controller`. Do not roll custom form state or validation when this stack covers it.

### Separation of concerns

Do not mix business logic with display. Keep components presentational and easy to test: put mutations, form setup, validation handlers, and side effects in hooks or providers; leave UI components to render props/state and call actions. Prefer the existing pattern of a display component plus a dedicated hook (e.g. `form.tsx` + `use-*-form.ts`). Cover the business logic with unit tests.

### Temp files

If the agent creates any temporary files while working, clean them up afterwards. Do not leave temp files in the workspace.
