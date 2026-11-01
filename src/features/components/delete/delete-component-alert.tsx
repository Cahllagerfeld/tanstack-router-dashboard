import { m } from "@/paraglide/messages";
import { DeleteAlert } from "@/shared/components/delete-alert";

import type { Component } from "../model";
import { useDeleteComponent } from "./use-delete-component";

type Props = {
	component: Pick<Component, "id" | "name">;
	onDeleted: () => unknown;
	onClose: () => void;
};

export function DeleteComponentAlert({ component, onDeleted, onClose }: Props) {
	const { mutate, isPending } = useDeleteComponent({ onDeleted });

	return (
		<DeleteAlert
			description={m.components_delete_description({ name: component.name })}
			isPending={isPending}
			onConfirm={() => mutate({ componentId: component.id })}
			onClose={onClose}
		/>
	);
}
