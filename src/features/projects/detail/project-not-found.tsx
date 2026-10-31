import { Link } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";
import { ContentInset } from "@/shared/components/content-inset";
import { getEntityIcon } from "@/shared/lib/entity-icons";
import { Button } from "@/shared/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/shared/ui/empty";

const ProjectIcon = getEntityIcon("project");

export function ProjectNotFound() {
	return (
		<ContentInset>
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
						render={
							<Link to="/projects">{m.projects_detail_go_to_list()}</Link>
						}
					/>
				</EmptyContent>
			</Empty>
		</ContentInset>
	);
}
