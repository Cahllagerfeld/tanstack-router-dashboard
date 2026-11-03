import { z } from "zod";

import { m } from "@/paraglide/messages";

function isWebUrl(value: string) {
	if (!URL.canParse(value)) return false;
	const { protocol } = new URL(value);
	return protocol === "http:" || protocol === "https:";
}

export const serverSettingsSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, m.server_settings_validation_name_required())
		.max(255, m.server_settings_validation_name_max()),
	logoUrl: z
		.string()
		.trim()
		.refine(
			(value) => value === "" || isWebUrl(value),
			m.server_settings_validation_logo_url()
		),
	enableAnalytics: z.boolean(),
	displayAnnouncements: z.boolean(),
	displayUpdates: z.boolean(),
});

export type ServerSettingsValues = z.infer<typeof serverSettingsSchema>;
