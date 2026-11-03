import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { SettingsSection } from "@/app/layouts/settings-section";
import { sessionQueries } from "@/features/session";
import { ChangePasswordForm, ProfileForm } from "@/features/session/ui";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/settings/profile")({
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(sessionQueries.currentIdentity());
		return { crumb: m.settings_profile_title() };
	},
	head: () => ({
		meta: [{ title: m.settings_profile_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { data: identity } = useSuspenseQuery(sessionQueries.currentIdentity());

	return (
		<>
			<h1 className="sr-only">{m.settings_profile_title()}</h1>
			<SettingsSection
				title={m.settings_profile_details_title()}
				description={m.settings_profile_details_description()}
			>
				<ProfileForm identity={identity} />
			</SettingsSection>
			<SettingsSection
				title={m.settings_profile_password_title()}
				description={m.settings_profile_password_description()}
			>
				<ChangePasswordForm />
			</SettingsSection>
		</>
	);
}
