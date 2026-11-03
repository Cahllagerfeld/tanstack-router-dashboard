import { Link } from "@tanstack/react-router";
import { useState } from "react";

import {
	ActionsMenu,
	DeleteMenuItem,
	EditMenuItem,
} from "@/shared/components/actions-menu";

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
				<EditMenuItem
					render={
						<Link
							to="/infra/components/$component_id/edit"
							params={{ component_id: component.id }}
						/>
					}
				/>
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
