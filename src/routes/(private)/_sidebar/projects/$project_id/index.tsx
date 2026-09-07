import { createFileRoute } from "@tanstack/react-router";
import { Construction } from "lucide-react";

import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/"
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Empty className="min-h-[24rem] border bg-muted/20">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Construction />
				</EmptyMedia>
				<EmptyTitle>{m.projects_overview_title()}</EmptyTitle>
				<EmptyDescription>{m.projects_overview_description()}</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
