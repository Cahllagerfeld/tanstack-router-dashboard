import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { DeleteUserAlert } from "./delete-user-alert";

const { deleteRequest, onClose, toastError, toastSuccess } = vi.hoisted(() => ({
	deleteRequest: vi.fn(),
	onClose: vi.fn(),
	toastError: vi.fn(),
	toastSuccess: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { DELETE: deleteRequest },
}));
vi.mock("sonner", () => ({
	toast: { error: toastError, success: toastSuccess },
}));

beforeEach(() => {
	vi.clearAllMocks();
});

async function renderDeleteAlert() {
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: false } },
	});
	const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");
	const screen = await render(
		<QueryClientProvider client={queryClient}>
			<DeleteUserAlert
				user={{
					id: "user-id",
					name: "grace",
					resolvedName: "Grace Hopper",
					fullName: "Grace Hopper",
					isAdmin: false,
					isActive: true,
					created: undefined,
					email: undefined,
				}}
				onClose={onClose}
			/>
		</QueryClientProvider>
	);

	return { invalidateQueries, screen };
}

test("names the user being deleted without deleting it", async () => {
	const { screen } = await renderDeleteAlert();

	await expect
		.element(screen.getByText(m.users_delete_description({ name: "grace" })))
		.toBeInTheDocument();
	expect(deleteRequest).not.toHaveBeenCalled();
});

test("cancelling closes the alert without deleting the user", async () => {
	const { screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_cancel() }).click();

	await expect.poll(() => onClose).toHaveBeenCalledOnce();
	expect(deleteRequest).not.toHaveBeenCalled();
});

test("confirming deletes the user, refreshes the list and closes the alert", async () => {
	deleteRequest.mockResolvedValue({
		data: undefined,
		error: undefined,
		response: new Response(null, { status: 204 }),
	});
	const { invalidateQueries, screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect.poll(() => onClose).toHaveBeenCalledOnce();
	expect(deleteRequest.mock.calls[0]?.[1]).toMatchObject({
		params: { path: { user_name_or_id: "user-id" } },
	});
	expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["users"] });
	expect(toastSuccess).toHaveBeenCalledWith(m.users_delete_success());
});

test("a failed deletion keeps the alert open and communicates the API error", async () => {
	deleteRequest.mockRejectedValue(
		new FetchError({
			status: 403,
			statusText: "Forbidden",
			message: "You cannot delete yourself",
		})
	);
	const { screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["You cannot delete yourself"]]);
	expect(onClose).not.toHaveBeenCalled();
	await expect
		.element(screen.getByRole("button", { name: m.common_action_delete() }))
		.toBeEnabled();
});
