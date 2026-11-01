import { type LucideIcon, SearchX } from "lucide-react";
import type { ReactNode } from "react";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/shared/ui/empty";

type TableEmptyProps = {
	icon: LucideIcon;
	title: string;
	description: string;
	action?: ReactNode;
};

/** The one layout for a resource with nothing to show. */
export function TableEmpty({
	icon: Icon,
	title,
	description,
	action,
}: TableEmptyProps) {
	return (
		<Empty className="min-h-80">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Icon aria-hidden="true" />
				</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				<EmptyDescription>{description}</EmptyDescription>
			</EmptyHeader>
			{action ? <EmptyContent>{action}</EmptyContent> : null}
		</Empty>
	);
}

/** Records exist, but the user's filters exclude all of them. */
export function TableNoMatches({ onClear }: { onClear: () => void }) {
	return (
		<TableEmpty
			icon={SearchX}
			title={m.common_table_no_matches_title()}
			description={m.common_table_no_matches_description()}
			action={
				<Button variant="outline" onClick={onClear}>
					{m.common_table_clear_filters()}
				</Button>
			}
		/>
	);
}
