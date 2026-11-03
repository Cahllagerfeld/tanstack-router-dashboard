import { m } from "@/paraglide/messages";
import { DeleteAlert } from "@/shared/components/delete-alert";

import type { Run } from "../model";
import { useDeleteRun } from "./use-delete-run";

type Props = {
	run: Pick<Run, "id" | "name">;
	onClose: () => void;
};

export function DeleteRunAlert({ run, onClose }: Props) {
	const { mutate, isPending } = useDeleteRun({ onDeleted: onClose });

	return (
		<DeleteAlert
			description={m.runs_delete_description({ name: run.name })}
			isPending={isPending}
			onConfirm={() => mutate({ runId: run.id })}
			onClose={onClose}
		/>
	);
}
