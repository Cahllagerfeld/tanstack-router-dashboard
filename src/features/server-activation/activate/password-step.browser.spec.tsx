import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";

import { serverQueries } from "../data/queries";
import { PasswordStep } from "./password-step";

const { navigate, post, put, toast } = vi.hoisted(() => ({
	navigate: vi.fn(),
	post: vi.fn(),
	put: vi.fn(),
	toast: { error: vi.fn(), success: vi.fn() },
}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { POST: post, PUT: put },
}));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));
vi.mock("sonner", () => ({ toast }));

beforeEach(() => {
	vi.clearAllMocks();
	vi.spyOn(console, "error").mockImplementation(() => undefined);
});

function renderPasswordStep() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
	});
	queryClient.setQueryData(serverQueries.serverInfo().queryKey, {
		active: false,
	} as never);
	const screen = render(
		<QueryClientProvider client={queryClient}>
			<PasswordStep />
			<button type="submit" form="server-activation-form">
				submit
			</button>
		</QueryClientProvider>
	);

	return { queryClient, screen };
}

async function submit(
	{ screen }: ReturnType<typeof renderPasswordStep>,
	confirmPassword = "password123"
) {
	const view = await screen;
	await view
		.getByRole("textbox", { name: m.common_field_username() })
		.fill("admin");
	await view
		.getByLabelText(m.common_field_password(), { exact: true })
		.fill("password123");
	await view
		.getByLabelText(m.common_field_confirm_password())
		.fill(confirmPassword);
	await view.getByRole("button", { name: "submit" }).click();
	return view;
}

test("activating logs in, refreshes server info, and continues home", async () => {
	put.mockResolvedValue({
		data: { id: "admin-id" },
		error: undefined,
		response: new Response(),
	});
	post.mockResolvedValue({
		data: { access_token: "token", token_type: "bearer" },
		error: undefined,
		response: new Response(),
	});
	const view = renderPasswordStep();
	const fetchInfo = vi.fn().mockResolvedValue({ active: true });
	view.queryClient.setQueryDefaults(serverQueries.serverInfo().queryKey, {
		queryFn: fetchInfo,
	});

	await submit(view);

	await expect.poll(() => navigate.mock.calls).toEqual([[{ to: "/" }]]);
	expect(put).toHaveBeenCalledWith("/api/v1/activate", {
		body: expect.objectContaining({
			admin_username: "admin",
			admin_password: "password123",
			server_name: expect.any(String),
		}),
	});
	expect(post).toHaveBeenCalledOnce();
	expect(toast.success).toHaveBeenCalledWith(m.server_activation_success());
	expect(toast.error).not.toHaveBeenCalled();
});

test("a failed activation is communicated without logging in or navigating", async () => {
	put.mockRejectedValue(new Error("activation failed"));

	await submit(renderPasswordStep());

	await expect
		.poll(() => toast.error.mock.calls)
		.toEqual([[m.server_activation_failed()]]);
	expect(post).not.toHaveBeenCalled();
	expect(navigate).not.toHaveBeenCalled();
});

test("a failed login after activation counts as a failed activation", async () => {
	put.mockResolvedValue({
		data: { id: "admin-id" },
		error: undefined,
		response: new Response(),
	});
	post.mockRejectedValue(new Error("login failed"));

	await submit(renderPasswordStep());

	await expect
		.poll(() => toast.error.mock.calls)
		.toEqual([[m.server_activation_failed()]]);
	expect(navigate).not.toHaveBeenCalled();
});

test("mismatched passwords never reach the API", async () => {
	const view = await submit(renderPasswordStep(), "different-password");

	await expect
		.element(view.getByText(m.server_activation_password_mismatch()))
		.toBeVisible();
	expect(put).not.toHaveBeenCalled();
});
