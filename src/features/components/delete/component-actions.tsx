import { useState } from "react";

import { ActionsMenu, DeleteMenuItem } from "@/shared/components/actions-menu";

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
				<DeleteMenuItem onClick={() => setDeleteOpen(true)} />
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
