import { useState } from "react";

import { ActionsMenu, DeleteMenuItem } from "@/shared/components/actions-menu";

import { DeleteUserAlert } from "../delete/delete-user-alert";
import type { User } from "../model";

export function AdminActions({ user }: { user: User }) {
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<ActionsMenu>
				<DeleteMenuItem onClick={() => setDeleteOpen(true)} />
			</ActionsMenu>
			{deleteOpen && (
				<DeleteUserAlert user={user} onClose={() => setDeleteOpen(false)} />
			)}
		</>
	);
}
