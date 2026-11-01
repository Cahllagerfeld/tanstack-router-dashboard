import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { pipelineQueries } from "../data/queries";
import type { PipelineListInput } from "../model";
import { PipelineListScreen } from "./pipeline-list-screen";

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

const params = {
	project: "project-id",
	page: 2,
	size: 10,
} satisfies PipelineListInput;

const pipeline = {
	id: "pipeline-id",
	name: "training-pipeline",
	permission_denied: false,
	body: {
		created: "2026-08-20T10:00:00Z",
		updated: "2026-08-21T10:00:00Z",
		project_id: "project-id",
	},
	metadata: { description: "Train a model" },
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
	await queryClient.ensureQueryData(pipelineQueries.list(params));
	await render(
		<QueryClientProvider client={queryClient}>
			<PipelineListScreen params={params} />
		</QueryClientProvider>
	);
}

beforeEach(() => {
	vi.clearAllMocks();
});

test("reuses the loader's query for the same Project and page", async () => {
	respondWith({ index: 2, total: 21, total_pages: 3, items: [pipeline] });

	await renderLoaded();

	await expect
		.element(page.getByRole("cell", { name: "training-pipeline" }))
		.toBeInTheDocument();
	expect(get).toHaveBeenCalledTimes(1);
});

test("shows the page range and links to the neighbouring pages", async () => {
	respondWith({ index: 2, total: 21, total_pages: 3, items: [pipeline] });

	await renderLoaded();

	await expect
		.element(
			page.getByText(
				m.common_table_range({ start: "11", end: "20", total: "21" })
			)
		)
		.toBeInTheDocument();
	await expect
		.element(page.getByLabelText(m.common_pagination_previous_label()))
		.toHaveAttribute("href", "?page=1");
	await expect
		.element(page.getByLabelText(m.common_pagination_next_label()))
		.toHaveAttribute("href", "?page=3");
});

test("marks a missing description and creation date as not available", async () => {
	respondWith({
		total: 1,
		items: [{ ...pipeline, body: null, metadata: null }],
	});

	await renderLoaded();

	await expect
		.element(page.getByRole("cell", { name: "training-pipeline" }))
		.toBeInTheDocument();
	await expect
		.element(page.getByText(m.common_status_not_available()).nth(1))
		.toBeInTheDocument();
});

test("an empty Project shows the empty state and no pagination", async () => {
	respondWith({ items: [] });

	await renderLoaded();

	await expect
		.element(page.getByText(m.pipelines_empty_title()))
		.toBeInTheDocument();
	await expect
		.element(page.getByLabelText(m.common_pagination_next_label()))
		.not.toBeInTheDocument();
});

test("hides and restores a Pipeline column", async () => {
	respondWith({ total: 1, items: [pipeline] });
	await renderLoaded();

	const description = page
		.getByRole("table")
		.getByText(m.pipelines_table_description(), { exact: true });
	await expect.element(description).toBeInTheDocument();

	await page.getByRole("button", { name: m.common_table_columns() }).click();
	const toggle = page.getByRole("menuitemcheckbox", {
		name: m.pipelines_table_description(),
	});
	await toggle.click();
	await expect.element(description).not.toBeInTheDocument();

	await toggle.click();
	await expect.element(description).toBeInTheDocument();
});
