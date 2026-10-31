import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { Suspense } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { StackList } from "./stack-list";

const { getRequest } = vi.hoisted(() => ({ getRequest: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: getRequest } }));

vi.mock("@tanstack/react-router", () => ({
	Link: ({
		to,
		search: _search,
		...props
	}: ComponentProps<"a"> & { to: string; search?: unknown }) => (
		<a href={to} {...props} />
	),
}));

beforeEach(() => {
	vi.clearAllMocks();
	localStorage.clear();
});

test("lists the requested page of Stacks with pagination", async () => {
	getRequest.mockResolvedValue({
		data: {
			index: 2,
			max_size: 20,
			total: 21,
			total_pages: 2,
			items: [{ id: "stack-1", name: "production", permission_denied: true }],
		},
		error: undefined,
		response: new Response(),
	});

	await render(
		<QueryClientProvider client={new QueryClient()}>
			<Suspense>
				<StackList page={2} size={20} />
			</Suspense>
		</QueryClientProvider>
	);

	await expect
		.element(page.getByRole("cell", { name: "production" }))
		.toBeVisible();
	await expect
		.element(
			page.getByText(
				m.common_table_range({ start: "21", end: "21", total: "21" })
			)
		)
		.toBeVisible();
	expect(getRequest).toHaveBeenCalledWith("/api/v1/stacks", {
		params: { query: { page: 2, size: 20, sort_by: "desc:created" } },
	});
});
