import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";

import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";
import { getPageRange, type Page } from "@/shared/lib/page";
import { Button, buttonVariants } from "@/shared/ui/button";

export function TableFooter({ page }: { page: Omit<Page<unknown>, "items"> }) {
	if (page.total === 0) return null;

	const { start, end } = getPageRange(page);
	const formatNumber = (value: number) => value.toLocaleString(getLocale());

	return (
		<div
			data-slot="table-footer"
			className="sticky bottom-0 z-10 flex h-11 shrink-0 items-center justify-end gap-3 border-t bg-background px-4 text-xs text-muted-foreground"
		>
			<span>
				{m.common_table_range({
					start: formatNumber(start),
					end: formatNumber(end),
					total: formatNumber(page.total),
				})}
			</span>
			<div className="flex gap-1">
				<PagerControl
					label={m.common_pagination_previous_label()}
					icon={ChevronLeft}
					page={page.index > 1 ? page.index - 1 : undefined}
				/>
				<PagerControl
					label={m.common_pagination_next_label()}
					icon={ChevronRight}
					page={page.index < page.total_pages ? page.index + 1 : undefined}
				/>
			</div>
		</div>
	);
}

function PagerControl({
	label,
	icon: Icon,
	page,
}: {
	label: string;
	icon: LucideIcon;
	page: number | undefined;
}) {
	if (page === undefined) {
		return (
			<Button variant="outline" size="icon-sm" aria-label={label} disabled>
				<Icon aria-hidden="true" />
			</Button>
		);
	}

	return (
		<Link
			to="."
			search={(prev: any) => ({ ...prev, page })}
			aria-label={label}
			className={buttonVariants({ variant: "outline", size: "icon-sm" })}
		>
			<Icon aria-hidden="true" />
		</Link>
	);
}
