import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { getEntityIcon } from "@/lib/constants/entity-icons";
import { m } from "@/paraglide/messages";

const ProjectIcon = getEntityIcon("project");

export function ProjectNotFound() {
	return (
		<Empty className="border border-dashed">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<ProjectIcon />
				</EmptyMedia>
				<EmptyTitle>{m.projects_detail_not_found_title()}</EmptyTitle>
				<EmptyDescription>
					{m.projects_detail_not_found_description()}
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button
					size="sm"
					render={<Link to="/projects">{m.projects_detail_go_to_list()}</Link>}
				/>
			</EmptyContent>
		</Empty>
	);
}
