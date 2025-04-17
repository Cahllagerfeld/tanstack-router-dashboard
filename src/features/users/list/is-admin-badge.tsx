import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function IsAdminBadge({ isAdmin }: { isAdmin: boolean }) {
	return (
		<Badge className={cn(isAdmin ? "bg-green-500" : "bg-red-500")}>
			{isAdmin ? "Yes" : "No"}
		</Badge>
	);
}
