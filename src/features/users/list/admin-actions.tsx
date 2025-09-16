import { BaseTableActions } from "@/components/base-table-actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";

export function AdminActions() {
	return (
		<BaseTableActions>
			<DropdownMenuItem>
				<Trash2 className="text-muted-foreground" />
				<span>Delete User</span>
			</DropdownMenuItem>
		</BaseTableActions>
	);
}
