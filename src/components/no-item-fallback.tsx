import { type LucideIcon, PlusCircle } from "lucide-react";
import { ReactNode } from "react";

type Props = {
	icon?: LucideIcon;
	title?: string;
	subtitle?: string;
	cta?: ReactNode;
};

export function NoItemFallback({
	icon: Icon = PlusCircle,
	title = "No items found",
	subtitle = "Get started by creating a new item.",
	cta,
}: Props) {
	return (
		<div className="animate-in fade-in-50 flex size-full flex-col items-center justify-center space-y-6 rounded-md border border-dashed p-8 text-center">
			<div className="bg-muted mx-auto flex size-20 items-center justify-center rounded-full">
				<Icon className="text-muted-foreground size-10" />
			</div>
			<div className="space-y-2">
				<h3 className="text-xl font-semibold">{title}</h3>
				<p className="text-muted-foreground text-sm">{subtitle}</p>
			</div>
			{cta}
		</div>
	);
}
