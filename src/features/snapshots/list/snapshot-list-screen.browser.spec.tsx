import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { snapshotQueries } from "../data/queries";
import type { SnapshotListInput } from "../model";
import { SnapshotListScreen } from "./snapshot-list-screen";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));
vi.mock("@tanstack/react-router", () => ({
	Link: ({
		search,
		children,
		...props
	}: {
		search: (prev: object) => { page: number };
		children: ReactNode;
	}) => (
		<a href={`?page=${search({}).page}`} {...props}>
			{children}
		</a>
	),
}));

const params = { project: "project-id" } satisfies SnapshotListInput;

const snapshot = {
	id: "snapshot-id",
	name: "nightly",
	permission_denied: false,
	body: {
		created: "2026-08-20T10:00:00Z",
		updated: "2026-08-21T10:00:00Z",
		project_id: "project-id",
		runnable: true,
		deployable: false,
		is_dynamic: false,
	},
	resources: {
		pipeline: {
			id: "pipeline-id",
			name: "training-pipeline",
			permission_denied: false,
		},
		stack: { id: "stack-id", name: "default", permission_denied: false },
		user: { id: "user-id", name: "alice", permission_denied: false },
		tags: [],
		visualizations: [],
	},
};

function respondWith(data: object) {
	get.mockResolvedValue({
		data: { index: 1, max_size: 10, total_pages: 1, total: 0, ...data },
		error: undefined,
		response: new Response(),
	});
}

/** Fills the cache the way the route loader does, then renders the screen. */
async function renderLoaded() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	await queryClient.ensureQueryData(snapshotQueries.list(params));
	await render(
		<QueryClientProvider client={queryClient}>
			<SnapshotListScreen params={params} />
		</QueryClientProvider>
	);
}

beforeEach(() => {
	vi.clearAllMocks();
});

test("lists a snapshot with its Pipeline, Stack, and author", async () => {
	respondWith({ total: 1, items: [snapshot] });

	await renderLoaded();

	for (const name of ["nightly", "training-pipeline", "default", "alice"]) {
		await expect
			.element(page.getByRole("cell", { name, exact: true }))
			.toBeInTheDocument();
	}
	expect(get).toHaveBeenCalledTimes(1);
});

test("shows an unnamed snapshot by its id and marks missing relations", async () => {
	respondWith({
		total: 1,
		items: [{ ...snapshot, name: null, resources: null }],
	});

	await renderLoaded();

	await expect
		.element(page.getByRole("cell", { name: "snapshot-id" }))
		.toBeInTheDocument();
	await expect
		.element(page.getByText(m.common_status_not_available()).nth(2))
		.toBeInTheDocument();
});

test("an empty Project shows the empty state", async () => {
	respondWith({ items: [] });

	await renderLoaded();

	await expect
		.element(page.getByText(m.snapshots_empty_title()))
		.toBeInTheDocument();
});
