import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function IsActiveBadge({ isActive }: { isActive: boolean }) {
	return (
		<Badge className={cn(isActive ? "bg-green-500" : "bg-neutral-500")}>
			{isActive ? "Active" : "Inactive"}
		</Badge>
	);
}
