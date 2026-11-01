import { Trash2 } from "lucide-react";
import { useState } from "react";

import { m } from "@/paraglide/messages";
import { ActionsMenu } from "@/shared/components/actions-menu";
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";

import { DeleteUserAlert } from "../delete/delete-user-alert";
import type { User } from "../model";

export function AdminActions({ user }: { user: User }) {
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<ActionsMenu>
				<DropdownMenuItem onClick={() => setDeleteOpen(true)}>
					<Trash2 className="text-muted-foreground" />
					<span>{m.users_action_delete()}</span>
				</DropdownMenuItem>
			</ActionsMenu>
			{deleteOpen && (
				<DeleteUserAlert user={user} onClose={() => setDeleteOpen(false)} />
			)}
		</>
	);
}
