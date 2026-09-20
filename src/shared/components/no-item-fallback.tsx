import { type LucideIcon, PlusCircle } from "lucide-react";
import type { ReactNode } from "react";

import { m } from "@/paraglide/messages";

type Props = {
	icon?: LucideIcon;
	title?: string;
	subtitle?: string;
	cta?: ReactNode;
};

export function NoItemFallback({
	icon: Icon = PlusCircle,
	title = m.common_empty_items_title(),
	subtitle = m.common_empty_items_description(),
	cta,
}: Props) {
	return (
		<div className="flex size-full animate-in flex-col items-center justify-center space-y-6 rounded-md border border-dashed p-8 text-center fade-in-50">
			<div className="mx-auto flex size-20 items-center justify-center rounded-full bg-muted">
				<Icon className="size-10 text-muted-foreground" />
			</div>
			<div className="space-y-2">
				<h3 className="text-xl font-semibold">{title}</h3>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
			{cta}
		</div>
	);
}
