import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { InviteMemberDialog } from "./invite-member-dialog";

const { post, toastError } = vi.hoisted(() => ({
	post: vi.fn(),
	toastError: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({ apiClient: { POST: post } }));
vi.mock("sonner", () => ({ toast: { error: toastError } }));

beforeEach(() => {
	vi.clearAllMocks();
});

function userResponse(activationToken: string | null) {
	return {
		data: {
			id: "ada-id",
			name: "ada",
			permission_denied: false,
			body: { activation_token: activationToken },
		},
		error: undefined,
		response: new Response(),
	};
}

async function openDialog() {
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: false } },
	});
	const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");
	const screen = await render(
		<QueryClientProvider client={queryClient}>
			<InviteMemberDialog />
		</QueryClientProvider>
	);
	await screen.getByRole("button", { name: m.users_invite_trigger() }).click();

	return { invalidateQueries, queryClient, screen };
}

const usernameField = () =>
	page.getByRole("textbox", { name: m.common_field_username() });
const submit = () =>
	page.getByRole("button", { name: m.users_invite_submit() }).click();

test("an empty username shows feedback without inviting anyone", async () => {
	await openDialog();

	await submit();

	await expect
		.element(page.getByText(m.users_invite_username_required()))
		.toBeVisible();
	expect(post).not.toHaveBeenCalled();
});

test("inviting an admin sends the input and shows the invite link", async () => {
	post.mockResolvedValue(userResponse("t+k/n"));
	const { invalidateQueries } = await openDialog();

	await usernameField().fill("  ada  ");
	await page.getByRole("switch", { name: m.users_invite_is_admin() }).click();
	await submit();

	await expect
		.element(page.getByText(m.users_invite_success_title({ name: "ada" })))
		.toBeVisible();
	await expect
		.element(page.getByRole("textbox", { name: m.users_invite_link_label() }))
		.toHaveValue(
			`${window.location.origin}/activate-user?user=ada-id&token=t%2Bk%2Fn`
		);
	expect(post).toHaveBeenCalledWith("/api/v1/users", {
		body: { name: "ada", is_admin: true, full_name: "", active: false },
	});
	expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["users"] });
});

test("a server error stays on the form and shows the API message", async () => {
	post.mockRejectedValue(
		new FetchError({
			status: 409,
			statusText: "Conflict",
			message: "A user with this name already exists",
		})
	);
	await openDialog();

	await usernameField().fill("ada");
	await submit();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["A user with this name already exists"]]);
	await expect.element(usernameField()).toHaveValue("ada");
});

test("a failure without a message falls back to the generic error", async () => {
	post.mockRejectedValue(new Error(""));
	await openDialog();

	await usernameField().fill("ada");
	await submit();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([[m.users_invite_failed()]]);
});

test("a missing activation token reports the problem and closes", async () => {
	post.mockResolvedValue(userResponse(null));
	const { invalidateQueries } = await openDialog();

	await usernameField().fill("ada");
	await submit();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([[m.users_invite_link_missing()]]);
	await expect.element(usernameField()).not.toBeInTheDocument();
	expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["users"] });
});

test("the dialog cannot close while the invitation is running", async () => {
	let respond: ((response: unknown) => void) | undefined;
	post.mockReturnValue(
		new Promise((resolve) => {
			respond = resolve;
		})
	);
	await openDialog();

	await usernameField().fill("ada");
	await submit();

	await expect
		.element(page.getByRole("button", { name: m.users_invite_submit() }))
		.toBeDisabled();
	await usernameField().click();
	await userEvent.keyboard("{Escape}");
	// A closing dialog stays mounted until its exit animation has finished.
	await new Promise((resolve) => setTimeout(resolve, 600));

	respond?.(userResponse("token"));

	await expect
		.element(page.getByRole("textbox", { name: m.users_invite_link_label() }))
		.toBeVisible();
});

test("closing forgets the invite link and reopening shows an empty form", async () => {
	post.mockResolvedValue(userResponse("token"));
	const { queryClient, screen } = await openDialog();

	await usernameField().fill("ada");
	await submit();
	await page
		.getByRole("button", { name: m.common_action_close() })
		.last()
		.click();

	await expect
		.element(page.getByRole("textbox", { name: m.users_invite_link_label() }))
		.not.toBeInTheDocument();
	await expect.poll(() => queryClient.getMutationCache().getAll()).toEqual([]);

	await screen.getByRole("button", { name: m.users_invite_trigger() }).click();

	await expect.element(usernameField()).toHaveValue("");
	await expect
		.element(page.getByRole("switch", { name: m.users_invite_is_admin() }))
		.not.toBeChecked();
});
