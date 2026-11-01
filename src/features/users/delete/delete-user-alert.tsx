import { m } from "@/paraglide/messages";
import { DeleteAlert } from "@/shared/components/delete-alert";

import type { User } from "../model";
import { useDeleteUser } from "./use-delete-user";

type Props = {
	user: User;
	onClose: () => void;
};

export function DeleteUserAlert({ user, onClose }: Props) {
	const { mutate, isPending } = useDeleteUser({ onDeleted: onClose });

	return (
		<DeleteAlert
			description={m.users_delete_description({ name: user.name })}
			isPending={isPending}
			onConfirm={() => mutate({ userId: user.id })}
			onClose={onClose}
		/>
	);
}
