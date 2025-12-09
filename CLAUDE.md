# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A React dashboard application for managing projects, components, and users. Built with TanStack Router, React Query, TypeScript, and Tailwind CSS. Uses Bun as the package manager and runtime.

**Key Technologies:**

- React 19 with React Compiler
- TanStack Router (file-based routing)
- TanStack React Query (data fetching)
- TypeScript (strict mode)
- Vite (build tool)
- Bun (package manager)
- shadcn/ui components
- Tailwind CSS v4

## Development Commands

```bash
# Development
bun dev                          # Start dev server (proxies /api to :8237)

# Type Generation (IMPORTANT!)
bun run generate:types -- <url>  # Generate TypeScript types from OpenAPI spec
                                 # Example: bun run generate:types -- http://localhost:8237

# Build & Check
bun run build                    # TypeScript check + Vite build
bun run check:types              # TypeScript check only

# Testing
bun run test:unit                # Run Vitest unit tests

# Code Quality
bun run lint                     # oxlint --fix
bun run format                   # Prettier with Tailwind plugin
```

## Architecture Overview

### Query Factory Pattern (CRITICAL!)

The most important pattern in this codebase. Located in `src/data/query-factory.ts`, it provides a standardized way to create queries and mutations for resources:

```typescript
// Creating queries for a resource
const projectQueries = createResourceQueries<
	ProjectList, // List response type
	Project, // Detail response type
	ProjectListParams // List query params type
>({
	baseKey: "projects",
	endpoints: {
		base: "/projects",
		detail: (id) => `/projects/${id}`,
	},
	defaultListParams: { sort_by: "desc:created", size: 10 },
});

// Usage in routes/components:
projectQueries.list({ page: 1 }); // Query for list
projectQueries.detail(id); // Query for detail
projectQueries.baseKey; // Base key for invalidation
projectQueries.fetchers.list(params); // Raw fetch function
```

**Mutation helpers:**

- `createCreateFn<TPayload, TResponse>(endpoint)` - POST
- `createUpdateFn<TPayload, TResponse>(endpoint, method)` - PUT/PATCH
- `createDeleteFn(endpoint)` - DELETE

### Authentication Architecture

**HTTP-only Cookie Based:**

- Authentication uses HTTP-only cookies (cannot be accessed from JavaScript)
- Current user query uses `staleTime: Infinity` to prevent unnecessary refetches
- Manual invalidation on logout ensures fresh data when needed

**Auth Guards (src/lib/auth-guards.ts):**

```typescript
// Require authentication (redirects to /login if 401)
await requireAuth(queryClient);

// Redirect if authenticated (for login page)
await redirectIfAuthenticated(queryClient, to);
```

**Global Error Handling:**

- 401 errors automatically redirect to `/login` (configured in `main.tsx` QueryCache)
- Server activation check in `__root.tsx` redirects to `/server-activation` if server inactive

### Routing Structure

File-based routing with TanStack Router:

```
routes/
├── __root.tsx                      # Global layout + auth/server checks
├── (public)/_grid-layout/          # Public routes
│   ├── login.tsx
│   └── server-activation.tsx
└── (private)/                      # Protected routes
    ├── _unscoped/                  # Without project context
    │   ├── projects.tsx            # Project list
    │   ├── components/index.tsx
    │   └── settings/
    └── _scoped/projects/$project_id/ # With project context
```

**Route Patterns:**

- `.lazy.tsx` - Component-only file for code splitting
- `.tsx` - Data loading (beforeLoad, loader) + component OR just data loading
- Most routes split into `.tsx` (loader) + `.lazy.tsx` (component)
- `(public)` and `(private)` are route groups (don't affect URLs)
- `_unscoped` and `_scoped` are layout routes

**Key Concepts:**

- `beforeLoad` - Authentication, redirects (runs before loader)
- `loader` - Data prefetching with `ensureQueryData`
- `validateSearch` - Zod validation for search params
- Route context includes `queryClient` globally

### Data Layer Organization

**Structure per resource:**

```
/data/[resource]/
├── index.ts              # Query definitions using query factory
└── mutations/            # Mutation hooks
    ├── create-[resource].ts
    ├── update-[resource].ts
    └── delete-[resource].ts
```

**API Client (`src/data/api-client.ts`):**

- Centralized fetch wrapper
- Automatic `/api/v1` prefix
- `credentials: "include"` for cookies
- Custom `FetchError` class with status codes
- JSON response parsing

**Query Key Structure:**

```typescript
["resource"][("resource", params)][("resource", id)]["current-user"]; // Base key // List with params // Detail // Special queries use custom keys
```

### Type Generation from OpenAPI

**CRITICAL WORKFLOW:**

```bash
bun run generate:types -- <backend-url>
```

This script (`scripts/types.js`):

1. Fetches OpenAPI spec from `<backend-url>/openapi.json`
2. Generates TypeScript types using `openapi-typescript`
3. Outputs to `src/types/core.ts` (656KB file!)
4. Custom transformer adds `additionalProperties: true` to objects

**Usage:**

```typescript
import { components } from "@/types/core";

export type Project = components["schemas"]["ProjectResponse"];
```

## Key Files to Understand

1. `src/main.tsx` - App initialization, router setup, global 401 handler
2. `src/routes/__root.tsx` - Global beforeLoad (auth + server activation check)
3. `src/data/query-factory.ts` - Query factory pattern (READ THIS FIRST!)
4. `src/data/api-client.ts` - API client with error handling
5. `src/lib/auth-guards.ts` - Authentication guards
6. `vite.config.ts` - Build config + API proxy to :8237

## Common Patterns

### Route Data Loading

```typescript
// Pattern: Prefetch in loader, use useSuspenseQuery in component

// route.tsx
export const Route = createFileRoute("/path")({
	beforeLoad: async ({ context: { queryClient } }) => {
		await requireAuth(queryClient); // If protected
	},
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(someQuery());
	},
});

// route.lazy.tsx
function Component() {
	const { data } = useSuspenseQuery(someQuery());
	// No loading state needed!
}
```

### Mutations with Invalidation

```typescript
const { mutate } = useMutation({
	mutationFn: apiCall,
	onSuccess: () => {
		// 1. Invalidate related queries
		queryClient.invalidateQueries({ queryKey: ["resource"] });

		// 2. Toast notification
		toast.success("Success message");

		// 3. Navigate
		navigate({ to: "/path" });
	},
	onError: (error) => {
		toast.error(error.message);
	},
});
```

### Forms with Zod + React Hook Form

```typescript
// 1. Define schema
const schema = z.object({ name: z.string().min(1) });

// 2. Create form
const form = useForm({
	resolver: zodResolver(schema),
	defaultValues: { name: "" },
});

// 3. Submit handler
function onSubmit(values: z.infer<typeof schema>) {
	mutate(values);
}
```

## Project Structure

```
/src
├── assets/           # Static assets
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components (26 components)
│   └── sidebar/     # Sidebar components
├── data/            # Data layer (queries, mutations, API)
│   ├── api.ts              # API path constants
│   ├── api-client.ts       # Fetch wrapper
│   ├── query-factory.ts    # Query factory pattern
│   └── [resource]/         # Resource-specific queries/mutations
├── features/        # Feature modules
│   ├── filters/     # Type-safe filter system
│   ├── pagination/  # Pagination components
│   └── [feature]/   # Feature-specific components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
│   ├── auth-guards.ts     # Route guards
│   ├── fetch-error.ts     # Custom error class
│   └── url.ts            # URL utilities
├── routes/          # File-based routing (auto-generated tree)
├── types/           # TypeScript definitions
│   └── core.ts     # Generated from OpenAPI (656KB!)
└── main.tsx         # App entry point
```

## Important Conventions

### Always use the query factory pattern

When adding a new resource, create queries using `createResourceQueries` for consistency and type safety.

### Split routes for performance

Use `.tsx` for data loading and `.lazy.tsx` for components to enable proper code splitting.

### Invalidate queries after mutations

Always invalidate related queries in mutation `onSuccess` to keep UI in sync.

### Use `ensureQueryData` in loaders

Prefer `ensureQueryData` over `fetchQuery` to avoid redundant fetches when data exists.

### Check query cache before fetching

For auth guards and similar checks, use `getQueryState` to avoid unnecessary API calls.

### Never edit generated files

`src/routeTree.gen.ts` and `src/types/core.ts` are auto-generated - don't modify them manually.

## Gotchas

1. **Route tree is auto-generated** - TanStack Router plugin regenerates on file changes
2. **Types file is huge** - `core.ts` is 656KB, reference via imports only
3. **API is proxied** - Dev server proxies `/api` to `http://localhost:8237`
4. **Strict TypeScript** - Handle nulls/undefined properly
5. **Use Bun** - Don't use npm/yarn (lockfile is `bun.lockb`)
6. **401 is global** - Don't add per-query 401 handling
7. **Query keys must match** - Use the same structure when invalidating
8. **LocalStorage is prefixed** - Use `getLocalStorageKey()` helper
