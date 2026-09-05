import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api";

import { CreateProjectForm } from "./form";

const { navigate, post, setOpen, toastError, toastSuccess } = vi.hoisted(
	() => ({
		navigate: vi.fn(),
		post: vi.fn(),
		setOpen: vi.fn(),
		toastError: vi.fn(),
		toastSuccess: vi.fn(),
	})
);

vi.mock("@/shared/api/client", () => ({ apiClient: { POST: post } }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));
vi.mock("sonner", () => ({
	toast: { error: toastError, success: toastSuccess },
}));

beforeEach(() => {
	vi.clearAllMocks();
});

async function renderProjectForm() {
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

	return { invalidateQueries, screen };
}

async function fillValidProject(
	screen: Awaited<ReturnType<typeof renderProjectForm>>["screen"]
) {
	await screen
		.getByRole("textbox", { name: m.projects_form_display_name() })
		.fill("Fraud Detection");
	await screen
		.getByRole("textbox", { name: m.projects_form_name() })
		.fill("fraud-detection");
	await screen
		.getByRole("textbox", { name: m.projects_form_description_optional() })
		.fill("Detect suspicious transactions");
}

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
	const { invalidateQueries, screen } = await renderProjectForm();
	await fillValidProject(screen);
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

test("invalid Project values show feedback without creating a Project", async () => {
	const { screen } = await renderProjectForm();

	await screen.getByRole("button", { name: "Create Project" }).click();

	await expect
		.element(screen.getByText(m.projects_validation_name_required()))
		.toBeVisible();
	await expect
		.element(screen.getByText(m.projects_validation_display_name_required()))
		.toBeVisible();
	expect(post).not.toHaveBeenCalled();
});

test("a failed Project creation keeps the form open and communicates the error", async () => {
	post.mockRejectedValue(
		new FetchError({
			status: 409,
			statusText: "Conflict",
			message: "A Project with this name already exists",
		})
	);
	const { screen } = await renderProjectForm();
	await fillValidProject(screen);

	await screen.getByRole("button", { name: "Create Project" }).click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["A Project with this name already exists"]]);
	expect(setOpen).not.toHaveBeenCalledWith(false);
	expect(navigate).not.toHaveBeenCalled();
});
