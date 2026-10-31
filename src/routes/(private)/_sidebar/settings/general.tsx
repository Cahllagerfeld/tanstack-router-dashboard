import { createFileRoute } from "@tanstack/react-router";

import { SettingsSection } from "@/app/layouts/settings-section";
import { KeyboardShortcutsSetting } from "@/features/keyboard-shortcuts/ui";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/settings/general")({
	loader: () => ({ crumb: m.settings_general_title() }),
	component: RouteComponent,
	head: () => ({
		meta: [{ title: m.settings_general_title() }],
	}),
});

function RouteComponent() {
	return (
		<>
			<h1 className="sr-only">{m.settings_general_title()}</h1>
			<SettingsSection
				title={m.settings_general_browser_title()}
				description={m.settings_general_browser_description()}
			>
				<KeyboardShortcutsSetting />
			</SettingsSection>
		</>
	);
}
