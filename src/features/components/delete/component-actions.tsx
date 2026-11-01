import { Trash2 } from "lucide-react";
import { useState } from "react";

import { m } from "@/paraglide/messages";
import { ActionsMenu } from "@/shared/components/actions-menu";
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";

import type { Component } from "../model";
import { DeleteComponentAlert } from "./delete-component-alert";

type Props = {
	component: Pick<Component, "id" | "name">;
	onDeleted?: () => unknown;
};

export function ComponentActions({ component, onDeleted }: Props) {
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<ActionsMenu>
				<DropdownMenuItem
					variant="destructive"
					onClick={() => setDeleteOpen(true)}
				>
					<Trash2 />
					<span>{m.common_action_delete()}</span>
				</DropdownMenuItem>
			</ActionsMenu>
			{deleteOpen && (
				<DeleteComponentAlert
					component={component}
					onDeleted={() => {
						setDeleteOpen(false);
						return onDeleted?.();
					}}
					onClose={() => setDeleteOpen(false)}
				/>
			)}
		</>
	);
}
