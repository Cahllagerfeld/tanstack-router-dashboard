import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { getEntityIcon } from "@/lib/constants/entity-icons";
import { Link } from "@tanstack/react-router";

const ComponentIcon = getEntityIcon("component");

export function ComponentNotFound() {
	return (
		<Empty className="border border-dashed">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<ComponentIcon />
				</EmptyMedia>
				<EmptyTitle>Component Not Found</EmptyTitle>
				<EmptyDescription>
					The component you are looking for does not exist.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button
					size="sm"
					render={<Link to="/components">Go to Components</Link>}
				></Button>
			</EmptyContent>
		</Empty>
	);
}
