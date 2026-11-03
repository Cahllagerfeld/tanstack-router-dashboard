import { describe, expect, it } from "vitest";

import { buildServerSettingsUpdate } from "./model";
import type { ServerSettingsValues } from "./schema";

const saved: ServerSettingsValues = {
	name: "brave-blue-otter",
	logoUrl: "https://example.test/logo.png",
	enableAnalytics: true,
	displayAnnouncements: false,
	displayUpdates: false,
};

describe("buildServerSettingsUpdate", () => {
	it("sends nothing when nothing changed", () => {
		expect(buildServerSettingsUpdate(saved, { ...saved })).toEqual({});
	});

	it("sends only the changed settings", () => {
		expect(
			buildServerSettingsUpdate(saved, {
				...saved,
				name: "renamed",
				displayUpdates: true,
			})
		).toEqual({ server_name: "renamed", display_updates: true });
	});

	it("leaves an unset display preference alone unless it was toggled", () => {
		const update = buildServerSettingsUpdate(saved, {
			...saved,
			enableAnalytics: false,
		});

		expect(update).toEqual({ enable_analytics: false });
		expect(update).not.toHaveProperty("display_announcements");
	});

	it("clears the logo when its URL is emptied", () => {
		expect(buildServerSettingsUpdate(saved, { ...saved, logoUrl: "" })).toEqual(
			{ logo_url: null }
		);
	});
});
