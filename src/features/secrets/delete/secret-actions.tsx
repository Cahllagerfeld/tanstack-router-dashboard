import { useState } from "react";

import { ActionsMenu, DeleteMenuItem } from "@/shared/components/actions-menu";

import type { Secret } from "../model";
import { DeleteSecretAlert } from "./delete-secret-alert";

export function SecretActions({
	secret,
}: {
	secret: Pick<Secret, "id" | "name">;
}) {
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<ActionsMenu>
				<DeleteMenuItem onClick={() => setDeleteOpen(true)} />
			</ActionsMenu>
			{deleteOpen && (
				<DeleteSecretAlert
					secret={secret}
					onClose={() => setDeleteOpen(false)}
				/>
			)}
		</>
	);
}
