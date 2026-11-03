import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { ChangePasswordForm } from "./change-password-form";

const { put, toastError, toastSuccess } = vi.hoisted(() => ({
	put: vi.fn(),
	toastError: vi.fn(),
	toastSuccess: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({ apiClient: { PUT: put } }));
vi.mock("sonner", () => ({
	toast: { error: toastError, success: toastSuccess },
}));

beforeEach(() => {
	vi.clearAllMocks();
});

async function renderAndFill() {
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: false } },
	});
	const screen = await render(
		<QueryClientProvider client={queryClient}>
			<ChangePasswordForm />
		</QueryClientProvider>
	);
	const current = screen.getByLabelText(m.session_password_current());
	await current.fill("old-password");
	await screen.getByLabelText(m.session_password_new()).fill("new-password");
	await screen
		.getByLabelText(m.session_password_confirm())
		.fill("new-password");
	await screen
		.getByRole("button", { name: m.session_password_submit() })
		.click();

	return { current };
}

test("changing the password sends the current and new password, then clears the form", async () => {
	put.mockResolvedValue({
		data: { id: "user-id", name: "ada", permission_denied: false },
		error: undefined,
		response: new Response(),
	});
	const { current } = await renderAndFill();

	await expect
		.poll(() => toastSuccess.mock.calls)
		.toEqual([[m.session_password_changed()]]);
	expect(put).toHaveBeenCalledWith("/api/v1/current-user", {
		body: { old_password: "old-password", password: "new-password" },
	});
	await expect.element(current).toHaveValue("");
});

test("a wrong current password keeps the form filled and communicates the error", async () => {
	put.mockRejectedValue(
		new FetchError({
			status: 403,
			statusText: "Forbidden",
			message: "Incorrect current password",
		})
	);
	const { current } = await renderAndFill();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["Incorrect current password"]]);
	await expect.element(current).toHaveValue("old-password");
});
