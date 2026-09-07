import { Trash2 } from "lucide-react";

import { BaseTableActions } from "@/components/base-table-actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { m } from "@/paraglide/messages";

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
