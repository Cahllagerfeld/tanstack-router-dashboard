import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { m } from "@/paraglide/messages";

import { UserList } from "./user-list";

const { deleteRequest, get } = vi.hoisted(() => ({
	deleteRequest: vi.fn(),
	get: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { DELETE: deleteRequest, GET: get },
}));
vi.mock("@tanstack/react-router", () => ({
	Link: ({ children }: { children: ReactNode }) => <a href="/">{children}</a>,
}));

const members = {
	index: 1,
	max_size: 20,
	total: 2,
	total_pages: 1,
	items: [
		{
			id: "ada-id",
			name: "ada",
			permission_denied: false,
			body: {
				created: "2026-08-20T10:00:00",
				updated: "2026-08-21T10:00:00",
				active: true,
				is_service_account: false,
				is_admin: true,
			},
		},
		{ id: "grace-id", name: "grace", permission_denied: true },
	],
};

function respond(path: string, identityIsAdmin: boolean) {
	if (path === "/api/v1/users") return members;
	return {
		id: "ada-id",
		name: "ada",
		permission_denied: false,
		body: { is_admin: identityIsAdmin },
	};
}

function renderUserList({
	isAdmin,
	name,
}: {
	isAdmin: boolean;
	name?: string;
}) {
	get.mockImplementation(async (path: string) => ({
		data: respond(path, isAdmin),
		error: undefined,
		response: new Response(),
	}));
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return render(
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={null}>
				<UserList queries={{ name }} />
			</Suspense>
		</QueryClientProvider>
	);
}

beforeEach(() => {
	vi.clearAllMocks();
});

test("lists members with their admin badge", async () => {
	const screen = await renderUserList({ isAdmin: false });

	await expect
		.element(screen.getByRole("cell", { name: /grace/ }))
		.toBeVisible();
	await expect.element(screen.getByText(m.users_status_admin())).toBeVisible();
});

test("requests the filtered list newest first", async () => {
	const screen = await renderUserList({
		isAdmin: false,
		name: "contains:ada",
	});

	await expect
		.element(screen.getByRole("cell", { name: /grace/ }))
		.toBeVisible();
	expect(get).toHaveBeenCalledWith("/api/v1/users", {
		params: { query: { name: "contains:ada", sort_by: "desc:created" } },
	});
});

test("hides the actions menu from a non-admin", async () => {
	const screen = await renderUserList({ isAdmin: false });

	await expect
		.element(screen.getByRole("cell", { name: /grace/ }))
		.toBeVisible();
	await expect
		.element(
			screen.getByRole("button", { name: m.common_navigation_open_menu() })
		)
		.not.toBeInTheDocument();
});

test("offers the invite action to an admin", async () => {
	const screen = await renderUserList({ isAdmin: true });

	await expect
		.element(screen.getByRole("button", { name: m.users_invite_trigger() }))
		.toBeVisible();
});

test("hides the invite action from a non-admin", async () => {
	const screen = await renderUserList({ isAdmin: false });

	await expect
		.element(screen.getByRole("cell", { name: /grace/ }))
		.toBeVisible();
	await expect
		.element(screen.getByRole("button", { name: m.users_invite_trigger() }))
		.not.toBeInTheDocument();
});

test("asks an admin to confirm before deleting the chosen member", async () => {
	const screen = await renderUserList({ isAdmin: true });
	const menus = screen.getByRole("button", {
		name: m.common_navigation_open_menu(),
	});

	await expect.element(menus.first()).toBeVisible();
	await expect.poll(() => menus.elements().length).toBe(2);
	await menus.last().click();
	await page.getByRole("menuitem", { name: m.common_action_delete() }).click();

	await expect
		.element(page.getByText(m.users_delete_description({ name: "grace" })))
		.toBeVisible();
	expect(deleteRequest).not.toHaveBeenCalled();
});
