import { describe, expect, it } from "vitest";

import { m } from "@/paraglide/messages";

import { serverSettingsSchema } from "./schema";

const valid = {
	name: "brave-blue-otter",
	logoUrl: "",
	enableAnalytics: true,
	displayAnnouncements: false,
	displayUpdates: false,
};

function messages(values: typeof valid) {
	const result = serverSettingsSchema.safeParse(values);
	return result.success
		? []
		: result.error.issues.map((issue) => issue.message);
}

describe("serverSettingsSchema", () => {
	it("trims the name and logo URL", () => {
		expect(
			serverSettingsSchema.parse({
				...valid,
				name: "  renamed  ",
				logoUrl: " https://example.test/logo.png ",
			})
		).toMatchObject({
			name: "renamed",
			logoUrl: "https://example.test/logo.png",
		});
	});

	it("requires a name", () => {
		expect(messages({ ...valid, name: "   " })).toEqual([
			m.server_settings_validation_name_required(),
		]);
	});

	it("limits the name to 255 characters", () => {
		expect(messages({ ...valid, name: "a".repeat(256) })).toEqual([
			m.server_settings_validation_name_max(),
		]);
	});

	it.each(["not a url", "javascript:alert(1)", "ftp://example.test/logo.png"])(
		"rejects %s as a logo URL",
		(logoUrl) => {
			expect(messages({ ...valid, logoUrl })).toEqual([
				m.server_settings_validation_logo_url(),
			]);
		}
	);
});
