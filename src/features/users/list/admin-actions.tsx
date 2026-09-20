import { Trash2 } from "lucide-react";

import { m } from "@/paraglide/messages";
import { BaseTableActions } from "@/shared/components/base-table-actions";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";

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
