import { createFileRoute } from "@tanstack/react-router";

import { SettingsLayout } from "@/app/layouts/settings-layout";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/settings")({
	loader: () => ({ crumb: m.settings_navigation_label() }),
	component: SettingsLayout,
});
