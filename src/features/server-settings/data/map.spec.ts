import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import { serverSettingsFromApi } from "./map";

const body = {
	server_id: "server-id",
	server_name: "brave-blue-otter",
	active: true,
	enable_analytics: true,
	display_announcements: true,
	display_updates: false,
	last_user_activity: "2026-11-01T10:00:00",
	updated: "2026-11-02T10:00:00",
};

describe("serverSettingsFromApi", () => {
	it("maps the editable settings", () => {
		expect(
			serverSettingsFromApi({
				body: { ...body, logo_url: "https://example.test/logo.png" },
			})
		).toEqual({
			id: "server-id",
			name: "brave-blue-otter",
			logoUrl: "https://example.test/logo.png",
			enableAnalytics: true,
			displayAnnouncements: true,
			displayUpdates: false,
		});
	});

	it("reads unset display preferences and logo as off and absent", () => {
		expect(
			serverSettingsFromApi({
				body: {
					...body,
					logo_url: null,
					display_announcements: null,
					display_updates: null,
				},
			})
		).toMatchObject({
			logoUrl: undefined,
			displayAnnouncements: false,
			displayUpdates: false,
		});
	});

	it("rejects a response without settings", () => {
		expect(() => serverSettingsFromApi({ body: null })).toThrow(
			m.common_error_unwrapping()
		);
	});
});
