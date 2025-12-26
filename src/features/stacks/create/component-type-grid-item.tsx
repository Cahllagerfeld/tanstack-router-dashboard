import { ComponentIcon } from "@/components/icons/component-icon";
import { COMPONENT_TYPES } from "@/lib/constants/component-types";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { cn } from "@/lib/utils";

export type ComponentTypeGridItemProps = {
	type: (typeof COMPONENT_TYPES)[number];
	selected?: boolean;
};

export function ComponentTypeGridItem({
	type,
	selected = false,
}: ComponentTypeGridItemProps) {
	return (
		<div
			data-selected={selected}
			className={cn(
				"flex h-24 flex-col items-center justify-center space-y-2 rounded-md border p-2 text-sm transition-all",
				// Inactive (default) state
				"bg-muted/30 border-border text-muted-foreground",
				// Hover state
				"hover:bg-muted/50 hover:text-foreground hover:border-foreground/20 hover:shadow-sm",
				// Active/Selected state (ready for future use)
				"data-[selected=true]:bg-card data-[selected=true]:text-foreground data-[selected=true]:border-primary/40"
			)}
		>
			<ComponentIcon type={type} className="h-5 w-5 text-current" />
			<p>{snakeCaseToTitleCase(type)}</p>
		</div>
	);
}
