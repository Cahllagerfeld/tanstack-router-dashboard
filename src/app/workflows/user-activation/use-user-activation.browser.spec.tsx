import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ActivateUserForm } from "@/features/users/ui";
import { m } from "@/paraglide/messages";

import { useUserActivation } from "./use-user-activation";

const { get, navigate, post, put, toast } = vi.hoisted(() => ({
	get: vi.fn(),
	navigate: vi.fn(),
	post: vi.fn(),
	put: vi.fn(),
	toast: { error: vi.fn(), success: vi.fn() },
}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { GET: get, POST: post, PUT: put },
}));
vi.mock("@tanstack/react-router", async (importOriginal) => ({
	...(await importOriginal<typeof import("@tanstack/react-router")>()),
	useNavigate: () => navigate,
}));
vi.mock("sonner", () => ({ toast }));

const priorSessionKey = ["prior-session"];

beforeEach(() => {
	vi.clearAllMocks();
	put.mockResolvedValue({
		data: { id: "user-id", name: "ada" },
		error: undefined,
		response: new Response(),
	});
	post.mockResolvedValue({
		data: { access_token: "access-token", token_type: "bearer" },
		error: undefined,
		response: new Response(),
	});
	get.mockResolvedValue({
		data: { id: "user-id", name: "ada" },
		error: undefined,
		response: new Response(),
	});
});

function ActivationScreen() {
	const { activate, isPending } = useUserActivation();

	return (
		<ActivateUserForm
			userId="user-id"
			token="activation-token"
			isPending={isPending}
			onActivate={activate}
		/>
	);
}

async function renderForm() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
	});
	queryClient.setQueryData(priorSessionKey, "admin data");
	const view = await render(
		<QueryClientProvider client={queryClient}>
			<ActivationScreen />
		</QueryClientProvider>
	);

	return { queryClient, view };
}

type View = Awaited<ReturnType<typeof renderForm>>["view"];

function submitButton(view: View) {
	return view.getByRole("button", { name: m.users_activate_submit() });
}

async function fillAndSubmit(view: View, password = "password123") {
	await view
		.getByRole("textbox", { name: m.users_activate_full_name() })
		.fill("  Ada Lovelace  ");
	await view
		.getByLabelText(m.common_field_password(), { exact: true })
		.fill("password123");
	await view.getByLabelText(m.common_field_confirm_password()).fill(password);
	await submitButton(view).click();
}

test("short and mismatched passwords never reach the API", async () => {
	const { view } = await renderForm();

	await view
		.getByLabelText(m.common_field_password(), { exact: true })
		.fill("short");
	await submitButton(view).click();
	await expect
		.element(view.getByText(m.users_activate_password_minimum()))
		.toBeVisible();

	await fillAndSubmit(view, "different-password");
	await expect
		.element(view.getByText(m.users_activate_password_mismatch()))
		.toBeVisible();
	expect(put).not.toHaveBeenCalled();
});

test("activating submits the link's token and continues home signed in", async () => {
	const { queryClient, view } = await renderForm();

	await fillAndSubmit(view);

	await expect
		.poll(() => navigate.mock.calls)
		.toEqual([[{ to: "/", replace: true }]]);
	expect(put).toHaveBeenCalledWith("/api/v1/users/{user_name_or_id}/activate", {
		params: { path: { user_name_or_id: "user-id" } },
		body: {
			activation_token: "activation-token",
			password: "password123",
			full_name: "Ada Lovelace",
		},
	});
	expect(queryClient.getQueryData(priorSessionKey)).toBeUndefined();
	expect(toast.success).toHaveBeenCalledWith(m.users_activate_success());
	expect(toast.error).not.toHaveBeenCalled();
});

test("a failed activation shows the API message and keeps the form", async () => {
	put.mockRejectedValue(new Error("Token expired"));
	const { queryClient, view } = await renderForm();

	await fillAndSubmit(view);

	await expect.poll(() => toast.error.mock.calls).toEqual([["Token expired"]]);
	expect(post).not.toHaveBeenCalled();
	expect(navigate).not.toHaveBeenCalled();
	expect(queryClient.getQueryData(priorSessionKey)).toBe("admin data");
	await expect.element(submitButton(view)).toBeEnabled();
});

test("a failed activation without a message falls back to generic copy", async () => {
	put.mockRejectedValue(new Error(""));
	const { view } = await renderForm();

	await fillAndSubmit(view);

	await expect
		.poll(() => toast.error.mock.calls)
		.toEqual([[m.users_activate_failed()]]);
});

test("a failed login after activation sends the visitor to log in", async () => {
	post.mockRejectedValue(new Error("login failed"));
	const { queryClient, view } = await renderForm();

	await fillAndSubmit(view);

	await expect
		.poll(() => navigate.mock.calls)
		.toEqual([[{ to: "/login", replace: true }]]);
	expect(queryClient.getQueryData(priorSessionKey)).toBeUndefined();
	expect(toast.error.mock.calls).toEqual([[m.users_activate_login_failed()]]);
	expect(toast.success).not.toHaveBeenCalled();
});

test("a failed identity load never reads as a failed activation", async () => {
	get.mockRejectedValue(new Error("identity failed"));
	const { view } = await renderForm();

	await fillAndSubmit(view);

	await expect
		.poll(() => navigate.mock.calls)
		.toEqual([[{ to: "/login", replace: true }]]);
	expect(toast.error.mock.calls).toEqual([[m.users_activate_login_failed()]]);
	expect(put).toHaveBeenCalledOnce();
});

test("the single-use token cannot be resubmitted while pending", async () => {
	put.mockReturnValue(new Promise(() => undefined));
	const { view } = await renderForm();

	await fillAndSubmit(view);

	await expect.element(submitButton(view)).toBeDisabled();
	expect(put).toHaveBeenCalledOnce();
});

test("a blank full name is left out of the activation request", async () => {
	const { view } = await renderForm();

	await view
		.getByRole("textbox", { name: m.users_activate_full_name() })
		.fill("   ");
	await view
		.getByLabelText(m.common_field_password(), { exact: true })
		.fill("password123");
	await view
		.getByLabelText(m.common_field_confirm_password())
		.fill("password123");
	await submitButton(view).click();

	await expect.poll(() => put.mock.calls.length).toBe(1);
	expect(put.mock.calls[0]?.[1].body).toEqual({
		activation_token: "activation-token",
		password: "password123",
	});
});

test("leaving after a failed activation keeps no credentials in the cache", async () => {
	put.mockRejectedValue(new Error("Token expired"));
	const { queryClient, view } = await renderForm();

	await fillAndSubmit(view);
	await expect.poll(() => toast.error.mock.calls.length).toBe(1);

	await view.unmount();

	await expect.poll(() => queryClient.getMutationCache().getAll()).toEqual([]);
});
