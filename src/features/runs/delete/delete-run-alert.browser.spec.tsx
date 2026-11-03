import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { runKeys } from "../data/queries";
import { DeleteRunAlert } from "./delete-run-alert";

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
			<DeleteRunAlert
				run={{ id: "run-id", name: "training-run" }}
				onClose={onClose}
			/>
		</QueryClientProvider>
	);

	return { invalidateQueries, screen };
}

test("confirming deletes the Run, refreshes its lists and closes the alert", async () => {
	deleteRequest.mockResolvedValue({
		data: null,
		error: undefined,
		response: new Response(),
	});
	const { invalidateQueries, screen } = await renderDeleteAlert();

	await expect
		.element(
			screen.getByText(m.runs_delete_description({ name: "training-run" }))
		)
		.toBeInTheDocument();
	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect.poll(() => onClose).toHaveBeenCalledOnce();
	expect(deleteRequest.mock.calls[0]?.[0]).toBe("/api/v1/runs/{run_id}");
	expect(deleteRequest.mock.calls[0]?.[1]).toMatchObject({
		params: { path: { run_id: "run-id" } },
	});
	expect(invalidateQueries).toHaveBeenCalledWith({
		queryKey: runKeys.lists(),
	});
	expect(toastSuccess).toHaveBeenCalledWith(m.runs_delete_success());
});

test("a failed deletion keeps the alert open and communicates the API error", async () => {
	deleteRequest.mockRejectedValue(
		new FetchError({
			status: 409,
			statusText: "Conflict",
			message: "Run is still in progress",
		})
	);
	const { screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["Run is still in progress"]]);
	expect(onClose).not.toHaveBeenCalled();
	await expect
		.element(screen.getByRole("button", { name: m.common_action_delete() }))
		.toBeEnabled();
});
