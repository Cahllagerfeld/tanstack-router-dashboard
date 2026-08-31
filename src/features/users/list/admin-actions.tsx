import { BaseTableActions } from "@/components/base-table-actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { m } from "@/paraglide/messages";
import { Trash2 } from "lucide-react";

export function AdminActions() {
	return (
		<BaseTableActions>
			<DropdownMenuItem>
				<Trash2 className="text-muted-foreground" />
				<span>{m.users_action_delete()}</span>
			</DropdownMenuItem>
		</BaseTableActions>
	);
}
