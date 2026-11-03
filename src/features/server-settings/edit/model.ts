import type { ServerSettings, ServerSettingsUpdateInput } from "../model";
import type { ServerSettingsValues } from "./schema";

export function serverSettingsFormValues(
	settings: ServerSettings
): ServerSettingsValues {
	return {
		name: settings.name,
		logoUrl: settings.logoUrl ?? "",
		enableAnalytics: settings.enableAnalytics,
		displayAnnouncements: settings.displayAnnouncements,
		displayUpdates: settings.displayUpdates,
	};
}

/**
 * Only the settings that differ from the saved ones. An unset display
 * preference reads as off, so leaving it untouched must not store `false`.
 */
export function buildServerSettingsUpdate(
	saved: ServerSettingsValues,
	next: ServerSettingsValues
): ServerSettingsUpdateInput {
	const update: ServerSettingsUpdateInput = {};
	if (next.name !== saved.name) update.server_name = next.name;
	if (next.logoUrl !== saved.logoUrl) update.logo_url = next.logoUrl || null;
	if (next.enableAnalytics !== saved.enableAnalytics)
		update.enable_analytics = next.enableAnalytics;
	if (next.displayAnnouncements !== saved.displayAnnouncements)
		update.display_announcements = next.displayAnnouncements;
	if (next.displayUpdates !== saved.displayUpdates)
		update.display_updates = next.displayUpdates;
	return update;
}
