import { m } from "@/paraglide/messages";
import { DeleteAlert } from "@/shared/components/delete-alert";

import type { Secret } from "../model";
import { useDeleteSecret } from "./use-delete-secret";

type Props = {
	secret: Pick<Secret, "id" | "name">;
	onClose: () => void;
};

export function DeleteSecretAlert({ secret, onClose }: Props) {
	const { mutate, isPending } = useDeleteSecret({ onDeleted: onClose });

	return (
		<DeleteAlert
			description={m.secrets_delete_description({ name: secret.name })}
			isPending={isPending}
			onConfirm={() => mutate({ secretId: secret.id })}
			onClose={onClose}
		/>
	);
}
