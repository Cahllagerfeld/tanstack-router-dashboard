import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { serverSettingsKeys } from "../data/queries";
import type { ServerSettings } from "../model";
import { ServerSettingsForm } from "./server-settings-form";

const { put, toastError, toastSuccess } = vi.hoisted(() => ({
	put: vi.fn(),
	toastError: vi.fn(),
	toastSuccess: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({ apiClient: { PUT: put } }));
vi.mock("sonner", () => ({
	toast: { error: toastError, success: toastSuccess },
}));

const settings: ServerSettings = {
	id: "server-id",
	name: "brave-blue-otter",
	logoUrl: undefined,
	enableAnalytics: true,
	displayAnnouncements: false,
	displayUpdates: false,
};

beforeEach(() => {
	vi.clearAllMocks();
});

async function renderForm(canEdit: boolean) {
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: false } },
	});
	queryClient.setQueryData(serverSettingsKeys.all, settings);
	return render(
		<QueryClientProvider client={queryClient}>
			<ServerSettingsForm canEdit={canEdit} />
		</QueryClientProvider>
	);
}

test("a non-admin sees the settings read-only", async () => {
	const screen = await renderForm(false);

	await expect
		.element(screen.getByText(m.server_settings_admin_only()))
		.toBeVisible();
	await expect
		.element(screen.getByRole("textbox", { name: m.server_settings_name() }))
		.toBeDisabled();
	await expect
		.element(
			screen.getByRole("switch", { name: m.server_settings_analytics_label() })
		)
		.toBeDisabled();
	await expect
		.element(screen.getByRole("button", { name: m.server_settings_save() }))
		.not.toBeInTheDocument();
});

test("an admin saves only the settings they changed", async () => {
	put.mockResolvedValue({
		data: {
			body: {
				server_id: "server-id",
				server_name: "renamed",
				active: true,
				enable_analytics: true,
				display_announcements: null,
				display_updates: true,
				last_user_activity: "2026-11-01T10:00:00",
				updated: "2026-11-02T10:00:00",
			},
		},
		error: undefined,
		response: new Response(),
	});
	const screen = await renderForm(true);
	const save = screen.getByRole("button", { name: m.server_settings_save() });
	await expect.element(save).toBeDisabled();

	await screen
		.getByRole("textbox", { name: m.server_settings_name() })
		.fill("renamed");
	await screen
		.getByRole("switch", { name: m.server_settings_updates_label() })
		.click();
	await save.click();

	await expect
		.poll(() => toastSuccess.mock.calls)
		.toEqual([[m.server_settings_notification_saved()]]);
	expect(put).toHaveBeenCalledWith("/api/v1/settings", {
		body: { server_name: "renamed", display_updates: true },
	});
	await expect.element(save).toBeDisabled();
});

test("invalid settings show feedback without saving", async () => {
	const screen = await renderForm(true);

	await screen
		.getByRole("textbox", { name: m.server_settings_name() })
		.fill("");
	await screen
		.getByRole("textbox", { name: m.server_settings_logo_url() })
		.fill("not a url");
	await screen.getByRole("button", { name: m.server_settings_save() }).click();

	await expect
		.element(screen.getByText(m.server_settings_validation_name_required()))
		.toBeVisible();
	await expect
		.element(screen.getByText(m.server_settings_validation_logo_url()))
		.toBeVisible();
	expect(put).not.toHaveBeenCalled();
});

test("a rejected save keeps the edits and reports the error", async () => {
	put.mockRejectedValue(
		new FetchError({
			status: 403,
			statusText: "Forbidden",
			message: "Only admins can update server settings",
		})
	);
	const screen = await renderForm(true);
	const name = screen.getByRole("textbox", { name: m.server_settings_name() });

	await name.fill("renamed");
	await screen.getByRole("button", { name: m.server_settings_save() }).click();

	await expect
		.poll(() => toastError.mock.calls)
		.toEqual([["Only admins can update server settings"]]);
	await expect.element(name).toHaveValue("renamed");
});
