import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";

import { LoginForm } from "./login-form";

const { get, navigate, post, toastError } = vi.hoisted(() => ({
	get: vi.fn(),
	navigate: vi.fn(),
	post: vi.fn(),
	toastError: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get, POST: post } }));
vi.mock("@tanstack/react-router", () => ({
	useRouter: () => ({ navigate }),
	useSearch: () => ({ next: "/projects" }),
}));
vi.mock("sonner", () => ({ toast: { error: toastError } }));

beforeEach(() => {
	vi.clearAllMocks();
});

function renderLoginForm() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
	});

	return render(
		<QueryClientProvider client={queryClient}>
			<LoginForm />
		</QueryClientProvider>
	);
}

test("a user can log in and continue to the requested page", async () => {
	post.mockResolvedValue({
		data: { access_token: "access-token", token_type: "bearer" },
		error: undefined,
		response: new Response(),
	});
	get.mockResolvedValue({
		data: { id: "user-id", name: "ada", permission_denied: true },
		error: undefined,
		response: new Response(),
	});
	const screen = await renderLoginForm();

	await screen
		.getByRole("textbox", { name: m.common_field_username() })
		.fill("ada");
	await screen.getByLabelText(m.common_field_password()).fill("correct horse");
	await screen.getByRole("button", { name: m.common_action_login() }).click();

	await expect.poll(() => navigate.mock.calls).toEqual([[{ to: "/projects" }]]);
});

test("a login failure is communicated without navigating", async () => {
	post.mockRejectedValue(new Error("Invalid credentials"));
	const screen = await renderLoginForm();

	await screen
		.getByRole("textbox", { name: m.common_field_username() })
		.fill("ada");
	await screen.getByLabelText(m.common_field_password()).fill("wrong-password");
	await screen.getByRole("button", { name: m.common_action_login() }).click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["Invalid credentials"]]);
	expect(navigate).not.toHaveBeenCalled();
});
