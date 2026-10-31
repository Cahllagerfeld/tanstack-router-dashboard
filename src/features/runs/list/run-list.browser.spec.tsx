import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, type ReactNode } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { RunList } from "./run-list";

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

beforeEach(() => {
	vi.clearAllMocks();
});

function runPage(items: object[]) {
	return {
		data: { index: 2, max_size: 20, total: 41, total_pages: 3, items },
		error: undefined,
		response: new Response(),
	};
}

async function renderRunList() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return render(
		<QueryClientProvider client={queryClient}>
			<Suspense>
				<RunList queries={{ project: "project-id", page: 2, size: 20 }} />
			</Suspense>
		</QueryClientProvider>
	);
}

test("shows a Run's formatted index, status, and embedded summaries", async () => {
	get.mockResolvedValue(
		runPage([
			{
				id: "run-id",
				name: "training-run",
				permission_denied: false,
				body: { index: 7, status: "retrying_after_failure" },
				resources: {
					pipeline: { name: "training-pipeline" },
					stack: { name: "production" },
					user: { name: "ada" },
				},
			},
		])
	);

	await renderRunList();

	await expect.element(page.getByText("#0007")).toBeInTheDocument();
	await expect
		.element(page.getByText("Retrying After Failure"))
		.toBeInTheDocument();
	await expect.element(page.getByText("training-pipeline")).toBeInTheDocument();
	await expect.element(page.getByText("production")).toBeInTheDocument();
	await expect.element(page.getByText("ada")).toBeInTheDocument();
	expect(get).toHaveBeenCalledTimes(1);
});

test("requests the Project's page and links to its neighbors", async () => {
	get.mockResolvedValue(runPage([]));

	await renderRunList();

	await expect
		.element(page.getByLabelText(m.common_pagination_next_label()))
		.toHaveAttribute("href", "?page=3");
	await expect
		.element(page.getByLabelText(m.common_pagination_previous_label()))
		.toHaveAttribute("href", "?page=1");
	expect(get).toHaveBeenCalledWith("/api/v1/runs", {
		params: {
			query: {
				project: "project-id",
				page: 2,
				size: 20,
				sort_by: "desc:created",
			},
		},
	});
});

test("marks each unavailable value on a restricted Run", async () => {
	get.mockResolvedValue(
		runPage([{ id: "run-id", name: "restricted", permission_denied: true }])
	);

	await renderRunList();

	await expect
		.element(page.getByText(m.common_status_not_available()).first())
		.toBeInTheDocument();
	expect(page.getByText(m.common_status_not_available()).all()).toHaveLength(6);
});
