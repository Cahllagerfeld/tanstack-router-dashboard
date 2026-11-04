import { Outlet } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";
import { GroupTabs } from "@/shared/components/group-tabs";

export function PipelinesLayout({ projectId }: { projectId: string }) {
	const params = { project_id: projectId };

	return (
		<>
			<GroupTabs
				label={m.pipelines_tabs_label()}
				tabs={[
					{
						label: m.pipelines_navigation_label(),
						to: "/projects/$project_id/pipelines",
						params,
					},
					{
						label: m.snapshots_navigation_label(),
						to: "/projects/$project_id/pipelines/snapshots",
						params,
					},
				]}
			/>
			<Outlet />
		</>
	);
}
