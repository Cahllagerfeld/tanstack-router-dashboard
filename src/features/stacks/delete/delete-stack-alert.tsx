import { m } from "@/paraglide/messages";
import { DeleteAlert } from "@/shared/components/delete-alert";

import type { Stack } from "../model";
import { useDeleteStack } from "./use-delete-stack";

type Props = {
	stack: Pick<Stack, "id" | "name">;
	onClose: () => void;
};

export function DeleteStackAlert({ stack, onClose }: Props) {
	const { mutate, isPending } = useDeleteStack({ onDeleted: onClose });

	return (
		<DeleteAlert
			description={m.stacks_delete_description({ name: stack.name })}
			isPending={isPending}
			onConfirm={() => mutate({ stackId: stack.id })}
			onClose={onClose}
		/>
	);
}
