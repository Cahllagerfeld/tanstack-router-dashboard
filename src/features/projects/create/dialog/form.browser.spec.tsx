import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";

import { CreateProjectForm } from "./form";

const { navigate, post, setOpen, toastSuccess } = vi.hoisted(() => ({
	navigate: vi.fn(),
	post: vi.fn(),
	setOpen: vi.fn(),
	toastSuccess: vi.fn(),
}));

vi.mock("@/data/api-client", () => ({ apiClient: { POST: post } }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));
vi.mock("sonner", () => ({
	toast: { error: vi.fn(), success: toastSuccess },
}));

test("a user can create a Project from valid form values", async () => {
	post.mockResolvedValue({
		data: {
			id: "project-id",
			name: "fraud-detection",
			permission_denied: false,
			body: {
				created: "2026-08-20T10:00:00Z",
				updated: "2026-08-21T10:00:00Z",
				display_name: "Fraud Detection",
			},
		},
		error: undefined,
		response: new Response(),
	});
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: false } },
	});
	const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");
	const screen = await render(
		<QueryClientProvider client={queryClient}>
			<CreateProjectForm id="create-project" setOpen={setOpen} />
			<button type="submit" form="create-project">
				Create Project
			</button>
		</QueryClientProvider>
	);

	await screen
		.getByRole("textbox", { name: m.projects_form_display_name() })
		.fill("Fraud Detection");
	await screen
		.getByRole("textbox", { name: m.projects_form_name() })
		.fill("fraud-detection");
	await screen
		.getByRole("textbox", { name: m.projects_form_description_optional() })
		.fill("Detect suspicious transactions");
	await screen.getByRole("button", { name: "Create Project" }).click();

	await expect.poll(() => setOpen.mock.calls).toEqual([[false]]);
	expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["projects"] });
	expect(toastSuccess).toHaveBeenCalledWith(
		m.projects_notification_created({ displayName: "Fraud Detection" })
	);
	expect(navigate).toHaveBeenCalledWith({
		to: "/projects/$project_id",
		params: { project_id: "fraud-detection" },
	});
});
