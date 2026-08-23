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
import { Link } from "@tanstack/react-router";

const ProjectIcon = getEntityIcon("project");

export function ProjectNotFound() {
	return (
		<Empty className="border border-dashed">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<ProjectIcon />
				</EmptyMedia>
				<EmptyTitle>Project Not Found</EmptyTitle>
				<EmptyDescription>
					The Project you are looking for does not exist.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button size="sm" render={<Link to="/projects">Go to Projects</Link>} />
			</EmptyContent>
		</Empty>
	);
}
