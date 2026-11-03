import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { stackKeys } from "../data/queries";
import { DeleteStackAlert } from "./delete-stack-alert";

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
			<DeleteStackAlert
				stack={{ id: "stack-id", name: "production" }}
				onClose={onClose}
			/>
		</QueryClientProvider>
	);

	return { invalidateQueries, screen };
}

test("confirming deletes the Stack, refreshes its lists and closes the alert", async () => {
	deleteRequest.mockResolvedValue({
		data: null,
		error: undefined,
		response: new Response(),
	});
	const { invalidateQueries, screen } = await renderDeleteAlert();

	await expect
		.element(
			screen.getByText(m.stacks_delete_description({ name: "production" }))
		)
		.toBeInTheDocument();
	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect.poll(() => onClose).toHaveBeenCalledOnce();
	expect(deleteRequest.mock.calls[0]?.[0]).toBe("/api/v1/stacks/{stack_id}");
	expect(deleteRequest.mock.calls[0]?.[1]).toMatchObject({
		params: { path: { stack_id: "stack-id" } },
	});
	expect(invalidateQueries).toHaveBeenCalledWith({
		queryKey: stackKeys.lists(),
	});
	expect(toastSuccess).toHaveBeenCalledWith(m.stacks_delete_success());
});

test("a failed deletion keeps the alert open and communicates the API error", async () => {
	deleteRequest.mockRejectedValue(
		new FetchError({
			status: 409,
			statusText: "Conflict",
			message: "Stack is still in use",
		})
	);
	const { screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["Stack is still in use"]]);
	expect(onClose).not.toHaveBeenCalled();
	await expect
		.element(screen.getByRole("button", { name: m.common_action_delete() }))
		.toBeEnabled();
});
