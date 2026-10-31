import { Trash2 } from "lucide-react";
import { useState } from "react";

import { m } from "@/paraglide/messages";
import { BaseTableActions } from "@/shared/components/base-table-actions";
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";

import type { Component } from "../model";
import { DeleteComponentAlert } from "./delete-component-alert";

export function ComponentActions({ component }: { component: Component }) {
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
				<DeleteComponentAlert
					component={component}
					onClose={() => setDeleteOpen(false)}
				/>
			)}
		</>
	);
}
