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

const ComponentIcon = getEntityIcon("component");

export function ComponentNotFound() {
	return (
		<ContentInset>
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
							<Link to="/infra/components">
								{m.components_not_found_go_to_list()}
							</Link>
						}
					></Button>
				</EmptyContent>
			</Empty>
		</ContentInset>
	);
}
