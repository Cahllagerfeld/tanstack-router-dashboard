import { m } from "@/paraglide/messages";
import { DeleteAlert } from "@/shared/components/delete-alert";

import type { Pipeline } from "../model";
import { useDeletePipeline } from "./use-delete-pipeline";

type Props = {
	pipeline: Pick<Pipeline, "id" | "name">;
	onClose: () => void;
};

export function DeletePipelineAlert({ pipeline, onClose }: Props) {
	const { mutate, isPending } = useDeletePipeline({ onDeleted: onClose });

	return (
		<DeleteAlert
			description={m.pipelines_delete_description({ name: pipeline.name })}
			isPending={isPending}
			onConfirm={() => mutate({ pipelineId: pipeline.id })}
			onClose={onClose}
		/>
	);
}
