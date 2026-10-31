import { m } from "@/paraglide/messages";
import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui/badge";

export function IsActiveBadge({ isActive }: { isActive: boolean }) {
	return (
		<Badge className={cn(isActive ? "bg-green-500" : "bg-neutral-500")}>
			{isActive ? m.users_status_active() : m.users_status_inactive()}
		</Badge>
	);
}
