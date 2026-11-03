import type { ApiBody } from "@/shared/api/client";

/** Server-wide settings. Unset display preferences read as off. */
export type ServerSettings = {
	id: string;
	name: string;
	logoUrl: string | undefined;
	enableAnalytics: boolean;
	displayAnnouncements: boolean;
	displayUpdates: boolean;
};

export type ServerSettingsUpdateInput = ApiBody<"/api/v1/settings", "put">;
