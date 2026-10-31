import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { Suspense } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { ComponentList } from "./component-list";

const { getRequest } = vi.hoisted(() => ({ getRequest: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: getRequest } }));

vi.mock("@tanstack/react-router", () => ({
	Link: ({
		to,
		params,
		search: _search,
		...props
	}: ComponentProps<"a"> & {
		to: string;
		params?: { component_id: string };
		search?: unknown;
	}) => (
		<a
			href={params ? to.replace("$component_id", params.component_id) : to}
			{...props}
		/>
	),
	useNavigate: () => vi.fn(),
}));

beforeEach(() => {
	vi.clearAllMocks();
	localStorage.clear();
});

function renderList(items: unknown[], total = items.length) {
	getRequest.mockResolvedValue({
		data: { index: 2, max_size: 20, total, total_pages: 2, items },
		error: undefined,
		response: new Response(),
	});

	return render(
		<QueryClientProvider client={new QueryClient()}>
			<Suspense>
				<ComponentList page={2} size={20} type="artifact_store" />
			</Suspense>
		</QueryClientProvider>
	);
}

test("lists the filtered page of Components with links and pagination", async () => {
	await renderList(
		[
			{
				id: "component-1",
				name: "local-store",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00Z",
					updated: "2026-08-21T10:00:00Z",
					type: "artifact_store",
					flavor_name: "local",
				},
				resources: {
					flavor: {
						id: "flavor-id",
						name: "local",
						permission_denied: false,
					},
				},
			},
		],
		21
	);

	await expect
		.element(page.getByRole("link", { name: "local-store" }))
		.toHaveAttribute("href", "/infra/components/component-1");
	await expect
		.element(page.getByRole("button", { name: "Artifact Store" }))
		.toHaveAttribute("data-state", "active");
	await expect
		.element(
			page.getByText(
				m.common_table_range({ start: "21", end: "21", total: "21" })
			)
		)
		.toBeVisible();
	expect(getRequest).toHaveBeenCalledWith("/api/v1/components", {
		params: {
			query: {
				type: "artifact_store",
				page: 2,
				size: 20,
				sort_by: "desc:created",
			},
		},
	});
});

test("keeps optional values unavailable for a permission-denied Component", async () => {
	await renderList(
		[{ id: "component-1", name: "local-store", permission_denied: true }],
		21
	);

	await expect
		.element(page.getByRole("link", { name: "local-store" }))
		.toBeVisible();
	await expect
		.element(page.getByText(m.common_status_not_available()).first())
		.toBeVisible();
});
