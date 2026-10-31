import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { RelatedStackList } from "./related-stack-list";

const { getRequest } = vi.hoisted(() => ({ getRequest: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: getRequest } }));

beforeEach(() => {
	vi.clearAllMocks();
	localStorage.clear();
});

function renderList(items: unknown[]) {
	getRequest.mockResolvedValue({
		data: {
			index: 1,
			max_size: 20,
			total: items.length,
			total_pages: 1,
			items,
		},
		error: undefined,
		response: new Response(),
	});

	return render(
		<QueryClientProvider client={new QueryClient()}>
			<Suspense>
				<RelatedStackList componentId="component-id" />
			</Suspense>
		</QueryClientProvider>
	);
}

test("lists the Stacks filtered by the Component with their creators", async () => {
	await renderList([
		{
			id: "stack-1",
			name: "production",
			permission_denied: false,
			resources: {
				active: true,
				user: {
					id: "user-id",
					name: "ada",
					permission_denied: false,
					body: { full_name: "Ada Lovelace" },
				},
			},
		},
	]);

	await expect
		.element(page.getByRole("cell", { name: "production" }))
		.toBeVisible();
	await expect.element(page.getByRole("cell", { name: "ada" })).toBeVisible();
	expect(getRequest).toHaveBeenCalledWith("/api/v1/stacks", {
		params: {
			query: { component_id: "component-id", sort_by: "desc:created" },
		},
	});
});

test("keeps optional values unavailable for a permission-denied Stack", async () => {
	await renderList([
		{ id: "stack-1", name: "production", permission_denied: true },
	]);

	await expect
		.element(page.getByRole("cell", { name: "production" }))
		.toBeVisible();
	await expect
		.element(page.getByText(m.common_status_not_available()).first())
		.toBeVisible();
});
