import { useState } from "react";

import { ActionsMenu, DeleteMenuItem } from "@/shared/components/actions-menu";

import type { Stack } from "../model";
import { DeleteStackAlert } from "./delete-stack-alert";

export function StackActions({ stack }: { stack: Pick<Stack, "id" | "name"> }) {
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<ActionsMenu>
				<DeleteMenuItem onClick={() => setDeleteOpen(true)} />
			</ActionsMenu>
			{deleteOpen && (
				<DeleteStackAlert stack={stack} onClose={() => setDeleteOpen(false)} />
			)}
		</>
	);
}
