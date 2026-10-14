import { m } from "@/paraglide/messages";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

export function IsActiveBadge({ isActive }: { isActive: boolean }) {
	return (
		<Badge className={cn(isActive ? "bg-green-500" : "bg-neutral-500")}>
			{isActive ? m.users_status_active() : m.users_status_inactive()}
		</Badge>
	);
}
