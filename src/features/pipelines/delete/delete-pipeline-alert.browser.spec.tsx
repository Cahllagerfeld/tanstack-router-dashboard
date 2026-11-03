import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { pipelineKeys } from "../data/queries";
import { DeletePipelineAlert } from "./delete-pipeline-alert";

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
			<DeletePipelineAlert
				pipeline={{ id: "pipeline-id", name: "training" }}
				onClose={onClose}
			/>
		</QueryClientProvider>
	);

	return { invalidateQueries, screen };
}

test("confirming deletes the Pipeline, refreshes its lists and closes the alert", async () => {
	deleteRequest.mockResolvedValue({
		data: null,
		error: undefined,
		response: new Response(),
	});
	const { invalidateQueries, screen } = await renderDeleteAlert();

	await expect
		.element(
			screen.getByText(m.pipelines_delete_description({ name: "training" }))
		)
		.toBeInTheDocument();
	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect.poll(() => onClose).toHaveBeenCalledOnce();
	expect(deleteRequest.mock.calls[0]?.[0]).toBe(
		"/api/v1/pipelines/{pipeline_id}"
	);
	expect(deleteRequest.mock.calls[0]?.[1]).toMatchObject({
		params: { path: { pipeline_id: "pipeline-id" } },
	});
	expect(invalidateQueries).toHaveBeenCalledWith({
		queryKey: pipelineKeys.lists(),
	});
	expect(toastSuccess).toHaveBeenCalledWith(m.pipelines_delete_success());
});

test("a failed deletion keeps the alert open and communicates the API error", async () => {
	deleteRequest.mockRejectedValue(
		new FetchError({
			status: 409,
			statusText: "Conflict",
			message: "Pipeline not found",
		})
	);
	const { screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["Pipeline not found"]]);
	expect(onClose).not.toHaveBeenCalled();
	await expect
		.element(screen.getByRole("button", { name: m.common_action_delete() }))
		.toBeEnabled();
});
