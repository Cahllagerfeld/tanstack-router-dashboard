import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

export function IsActiveBadge({ isActive }: { isActive: boolean }) {
	return (
		<Badge className={cn(isActive ? "bg-green-500" : "bg-neutral-500")}>
			{isActive ? m.users_status_active() : m.users_status_inactive()}
		</Badge>
	);
}
