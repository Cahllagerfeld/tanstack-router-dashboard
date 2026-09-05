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

const ComponentIcon = getEntityIcon("component");

export function ComponentNotFound() {
	return (
		<Empty className="border border-dashed">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<ComponentIcon />
				</EmptyMedia>
				<EmptyTitle>{m.components_not_found_title()}</EmptyTitle>
				<EmptyDescription>
					{m.components_not_found_description()}
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button
					size="sm"
					render={
						<Link to="/components">{m.components_not_found_go_to_list()}</Link>
					}
				></Button>
			</EmptyContent>
		</Empty>
	);
}
