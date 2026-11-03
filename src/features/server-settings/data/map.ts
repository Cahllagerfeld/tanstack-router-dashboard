import { m } from "@/paraglide/messages";

import type { ServerSettings } from "../model";
import type { ServerSettingsDto } from "./dto";

export function serverSettingsFromApi(
	settings: ServerSettingsDto
): ServerSettings {
	const body = settings.body;
	if (!body) throw new Error(m.common_error_unwrapping());

	return {
		id: body.server_id,
		name: body.server_name,
		logoUrl: body.logo_url ?? undefined,
		enableAnalytics: body.enable_analytics,
		displayAnnouncements: body.display_announcements ?? false,
		displayUpdates: body.display_updates ?? false,
	};
}
