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
		<div className="flex h-full w-full flex-col items-center justify-center space-y-6 rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
			<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
				<Icon className="h-10 w-10 text-muted-foreground" />
			</div>
			<div className="space-y-2">
				<h3 className="text-xl font-semibold">{title}</h3>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
			{cta}
		</div>
	);
}
