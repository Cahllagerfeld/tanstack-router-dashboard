import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface KeyValueItem {
	key: string;
	label: string;
	value: ReactNode;
}

interface KeyValueListProps {
	items: KeyValueItem[];
	className?: string;
}

export function KeyValueList({ items, className }: KeyValueListProps) {
	return (
		<dl
			className={cn(
				"@container grid grid-cols-1 gap-x-4 gap-y-3 @sm:grid-cols-[200px_1fr]",
				className
			)}
		>
			{items.map((item) => (
				<div key={item.key} className="contents">
					<dt className="text-muted-foreground text-sm font-medium">
						{item.label}
					</dt>
					<dd className="text-sm">{item.value}</dd>
				</div>
			))}
		</dl>
	);
}
