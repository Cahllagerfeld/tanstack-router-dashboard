import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { Suspense } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { SecretList } from "./secret-list";

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

function renderList(items: unknown[], total = items.length) {
	getRequest.mockResolvedValue({
		data: { index: 2, max_size: 20, total, total_pages: 2, items },
		error: undefined,
		response: new Response(),
	});

	return render(
		<QueryClientProvider client={new QueryClient()}>
			<Suspense>
				<SecretList page={2} size={20} />
			</Suspense>
		</QueryClientProvider>
	);
}

test("lists the requested page of Secrets with visibility and pagination", async () => {
	await renderList(
		[
			{
				id: "secret-1",
				name: "aws-credentials",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00Z",
					updated: "2026-08-21T10:00:00Z",
					private: true,
				},
				resources: {
					user: { id: "user-id", name: "ada", permission_denied: false },
				},
			},
		],
		21
	);

	await expect
		.element(page.getByRole("cell", { name: "aws-credentials" }))
		.toBeVisible();
	await expect
		.element(page.getByText(m.secrets_visibility_private()))
		.toBeVisible();
	await expect.element(page.getByRole("cell", { name: "ada" })).toBeVisible();
	await expect
		.element(
			page.getByText(
				m.common_table_range({ start: "21", end: "21", total: "21" })
			)
		)
		.toBeVisible();
	expect(getRequest).toHaveBeenCalledWith("/api/v1/secrets", {
		params: { query: { page: 2, size: 20, sort_by: "desc:created" } },
	});
});

test("keeps visibility unavailable rather than public for a permission-denied Secret", async () => {
	await renderList([
		{ id: "secret-1", name: "aws-credentials", permission_denied: true },
	]);

	await expect
		.element(page.getByRole("cell", { name: "aws-credentials" }))
		.toBeVisible();
	await expect
		.element(page.getByText(m.secrets_visibility_public()))
		.not.toBeInTheDocument();
	await expect
		.element(page.getByText(m.common_status_not_available()).first())
		.toBeVisible();
});

test("an empty list explains itself", async () => {
	await renderList([]);

	await expect.element(page.getByText(m.secrets_empty_title())).toBeVisible();
});
