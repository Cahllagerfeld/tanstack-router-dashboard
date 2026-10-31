import { Trash2 } from "lucide-react";
import { useState } from "react";

import { m } from "@/paraglide/messages";
import { BaseTableActions } from "@/shared/components/base-table-actions";
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";

import { DeleteUserAlert } from "../delete/delete-user-alert";
import type { User } from "../model";

export function AdminActions({ user }: { user: User }) {
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<BaseTableActions>
				<DropdownMenuItem
					variant="destructive"
					onClick={() => setDeleteOpen(true)}
				>
					<Trash2 />
					<span>{m.common_action_delete()}</span>
				</DropdownMenuItem>
			</BaseTableActions>
			{deleteOpen && (
				<DeleteUserAlert user={user} onClose={() => setDeleteOpen(false)} />
			)}
		</>
	);
}
