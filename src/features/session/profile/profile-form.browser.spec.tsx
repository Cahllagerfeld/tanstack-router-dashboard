import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { sessionQueries } from "../data/queries";
import type { CurrentIdentity } from "../model";
import { ProfileForm } from "./profile-form";

const { put, toastError, toastSuccess } = vi.hoisted(() => ({
	put: vi.fn(),
	toastError: vi.fn(),
	toastSuccess: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({ apiClient: { PUT: put } }));
vi.mock("sonner", () => ({
	toast: { error: toastError, success: toastSuccess },
}));

const identity: CurrentIdentity = {
	id: "user-id",
	name: "ada",
	fullName: "Ada Lovelace",
	resolvedName: "Ada Lovelace",
	email: "ada@example.test",
	isAdmin: false,
};

beforeEach(() => {
	vi.clearAllMocks();
});

async function renderProfileForm() {
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: false } },
	});
	const { queryKey } = sessionQueries.currentIdentity();
	queryClient.setQueryData(queryKey, identity);
	const screen = await render(
		<QueryClientProvider client={queryClient}>
			<ProfileForm identity={identity} />
		</QueryClientProvider>
	);

	return {
		screen,
		/** The signed-in identity refreshing while the page stays open. */
		refreshIdentity: (refreshed: CurrentIdentity) =>
			screen.rerender(
				<QueryClientProvider client={queryClient}>
					<ProfileForm identity={refreshed} />
				</QueryClientProvider>
			),
		cachedIdentity: () => queryClient.getQueryData(queryKey),
		fullName: screen.getByRole("textbox", {
			name: m.session_profile_full_name(),
		}),
		username: screen.getByRole("textbox", { name: m.common_field_username() }),
		save: screen.getByRole("button", { name: m.session_profile_submit() }),
	};
}

test("saving sends only the changed fields and refreshes the signed-in identity", async () => {
	put.mockResolvedValue({
		data: {
			id: "user-id",
			name: "ada",
			permission_denied: false,
			body: {
				created: "2026-08-20T10:00:00",
				updated: "2026-08-21T10:00:00",
				active: true,
				full_name: "Ada King",
				is_service_account: false,
			},
			metadata: {
				email: "ada@example.test",
				user_metadata: {},
				oidc_claims: {},
			},
		},
		error: undefined,
		response: new Response(),
	});
	const { fullName, save, cachedIdentity } = await renderProfileForm();

	await expect.element(save).toBeDisabled();
	await fullName.fill("Ada King");
	await save.click();

	await expect
		.poll(() => toastSuccess.mock.calls)
		.toEqual([[m.session_profile_updated()]]);
	expect(put).toHaveBeenCalledWith("/api/v1/current-user", {
		body: { full_name: "Ada King" },
	});
	expect(cachedIdentity()).toMatchObject({ fullName: "Ada King" });
	await expect.element(save).toBeDisabled();
});

test("an invalid username shows feedback without saving", async () => {
	const { screen, username, save } = await renderProfileForm();

	await username.fill(" ");
	await save.click();

	await expect
		.element(screen.getByText(m.session_profile_username_required()))
		.toBeVisible();
	expect(put).not.toHaveBeenCalled();
});

test("a rejected update keeps the edits and communicates the error", async () => {
	put.mockRejectedValue(
		new FetchError({
			status: 409,
			statusText: "Conflict",
			message: "A user with this name already exists",
		})
	);
	const { username, save, cachedIdentity } = await renderProfileForm();

	await username.fill("grace");
	await save.click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["A user with this name already exists"]]);
	await expect.element(username).toHaveValue("grace");
	expect(cachedIdentity()).toBe(identity);
});

test("a malformed email shows the translated validation message", async () => {
	const { screen, save } = await renderProfileForm();

	await screen
		.getByRole("textbox", { name: m.session_profile_email() })
		.fill("ada@");
	await save.click();

	await expect
		.element(screen.getByText(m.session_profile_email_invalid()))
		.toBeVisible();
	expect(put).not.toHaveBeenCalled();
});

test("an identity refresh during editing does not resubmit the old username", async () => {
	put.mockResolvedValue({
		data: { id: "user-id", name: "grace", permission_denied: false },
		error: undefined,
		response: new Response(),
	});
	const { fullName, save, refreshIdentity } = await renderProfileForm();

	await refreshIdentity({ ...identity, name: "grace" });
	await fullName.fill("Ada King");
	await save.click();

	await expect.poll(() => put.mock.calls.length).toBe(1);
	expect(put).toHaveBeenCalledWith("/api/v1/current-user", {
		body: { full_name: "Ada King" },
	});
});

test("fields stay locked while a save is in flight", async () => {
	put.mockReturnValue(new Promise(() => {}));
	const { fullName, save } = await renderProfileForm();

	await fullName.fill("Ada King");
	await save.click();

	await expect.element(fullName).toBeDisabled();
	await expect.element(save).toBeDisabled();
});
