import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import { SettingsSection } from "@/app/layouts/settings-section";
import {
	DeleteProjectSetting,
	ProjectDetailsSetting,
} from "@/features/projects/ui";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute(
	"/(private)/_sidebar/settings/projects/$project_id/general"
)({
	loader: () => ({ crumb: m.settings_project_general_title() }),
	component: RouteComponent,
});

const projectRoute = getRouteApi(
	"/(private)/_sidebar/settings/projects/$project_id"
);

function RouteComponent() {
	const { project } = projectRoute.useLoaderData();

	return (
		<>
			<h1 className="sr-only">{m.settings_project_general_title()}</h1>
			<SettingsSection
				title={m.settings_project_details_title()}
				description={m.settings_project_details_description()}
			>
				<ProjectDetailsSetting project={project} />
			</SettingsSection>
			<SettingsSection
				title={m.settings_project_danger_title()}
				description={m.settings_project_danger_description()}
			>
				<DeleteProjectSetting project={project} />
			</SettingsSection>
		</>
	);
}
