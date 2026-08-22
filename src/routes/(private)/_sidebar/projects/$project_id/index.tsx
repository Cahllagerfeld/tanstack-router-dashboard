import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { createFileRoute } from "@tanstack/react-router";
import { Construction } from "lucide-react";

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
				<EmptyTitle>Project overview is under construction</EmptyTitle>
				<EmptyDescription>
					This Project overview will bring the most important Project details
					together in one place.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
