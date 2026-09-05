import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { FetchError } from "@/lib/fetch-error";
import { m } from "@/paraglide/messages";

import { DeleteProjectAlert } from "./delete-project-alert";

const { deleteRequest, navigate, setOpen, toastError, toastSuccess } =
	vi.hoisted(() => ({
		deleteRequest: vi.fn(),
		navigate: vi.fn(),
		setOpen: vi.fn(),
		toastError: vi.fn(),
		toastSuccess: vi.fn(),
	}));

vi.mock("@/data/api-client", () => ({
	apiClient: { DELETE: deleteRequest },
}));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));
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
			<DeleteProjectAlert projectId="project-id" open setOpen={setOpen} />
		</QueryClientProvider>
	);

	return { invalidateQueries, screen };
}

test("a user can confirm Project deletion", async () => {
	deleteRequest.mockResolvedValue({
		data: undefined,
		error: undefined,
		response: new Response(null, { status: 204 }),
	});
	const { invalidateQueries, screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect.poll(() => setOpen.mock.calls).toEqual([[false]]);
	expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["projects"] });
	expect(toastSuccess).toHaveBeenCalledWith(m.projects_notification_deleted());
	expect(navigate).toHaveBeenCalledWith({ to: "/projects" });
});

test("a failed deletion keeps the dialog open and communicates the API error", async () => {
	deleteRequest.mockRejectedValue(
		new FetchError({
			status: 409,
			statusText: "Conflict",
			message: "Project is still in use",
		})
	);
	const { screen } = await renderDeleteAlert();

	await screen.getByRole("button", { name: m.common_action_delete() }).click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["Project is still in use"]]);
	expect(setOpen).not.toHaveBeenCalledWith(false);
	expect(navigate).not.toHaveBeenCalled();
});
