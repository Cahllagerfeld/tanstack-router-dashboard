import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { SettingsSection } from "@/app/layouts/settings-section";
import { KeyboardShortcutsSetting } from "@/features/keyboard-shortcuts/ui";
import { serverSettingsQueries } from "@/features/server-settings";
import { ServerSettingsForm } from "@/features/server-settings/ui";
import { sessionQueries } from "@/features/session";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/settings/general")({
	loader: async ({ context: { queryClient } }) => {
		await Promise.all([
			queryClient.ensureQueryData(serverSettingsQueries.detail()),
			queryClient.ensureQueryData(sessionQueries.currentIdentity()),
		]);
		return { crumb: m.settings_general_title() };
	},
	component: RouteComponent,
	head: () => ({
		meta: [{ title: m.settings_general_title() }],
	}),
});

function RouteComponent() {
	const { data: identity } = useSuspenseQuery(sessionQueries.currentIdentity());

	return (
		<>
			<h1 className="sr-only">{m.settings_general_title()}</h1>
			<SettingsSection
				title={m.settings_general_server_title()}
				description={m.settings_general_server_description()}
			>
				<ServerSettingsForm canEdit={identity.isAdmin === true} />
			</SettingsSection>
			<SettingsSection
				title={m.settings_general_browser_title()}
				description={m.settings_general_browser_description()}
			>
				<KeyboardShortcutsSetting />
			</SettingsSection>
		</>
	);
}
