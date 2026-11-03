import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchServerSettings, updateServerSettings } from "./requests";

const { get, put } = vi.hoisted(() => ({ get: vi.fn(), put: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get, PUT: put } }));

const response = {
	data: {
		body: {
			server_id: "server-id",
			server_name: "renamed",
			active: true,
			enable_analytics: false,
			display_announcements: null,
			display_updates: true,
			last_user_activity: "2026-11-01T10:00:00",
			updated: "2026-11-02T10:00:00",
		},
	},
	error: undefined,
	response: new Response(),
};

describe("server settings requests", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches and maps the server settings", async () => {
		get.mockResolvedValue(response);

		await expect(fetchServerSettings()).resolves.toMatchObject({
			id: "server-id",
			name: "renamed",
		});
		expect(get).toHaveBeenCalledWith("/api/v1/settings");
	});

	it("sends the update and maps the saved settings", async () => {
		put.mockResolvedValue(response);

		await expect(
			updateServerSettings({ server_name: "renamed" })
		).resolves.toMatchObject({ name: "renamed", displayAnnouncements: false });
		expect(put).toHaveBeenCalledWith("/api/v1/settings", {
			body: { server_name: "renamed" },
		});
	});
});
