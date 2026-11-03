import { useState } from "react";

import { ActionsMenu, DeleteMenuItem } from "@/shared/components/actions-menu";

import type { Run } from "../model";
import { DeleteRunAlert } from "./delete-run-alert";

export function RunActions({ run }: { run: Pick<Run, "id" | "name"> }) {
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<ActionsMenu>
				<DeleteMenuItem onClick={() => setDeleteOpen(true)} />
			</ActionsMenu>
			{deleteOpen && (
				<DeleteRunAlert run={run} onClose={() => setDeleteOpen(false)} />
			)}
		</>
	);
}
