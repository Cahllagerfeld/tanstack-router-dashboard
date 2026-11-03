import { useState } from "react";

import { ActionsMenu, DeleteMenuItem } from "@/shared/components/actions-menu";

import type { Pipeline } from "../model";
import { DeletePipelineAlert } from "./delete-pipeline-alert";

export function PipelineActions({
	pipeline,
}: {
	pipeline: Pick<Pipeline, "id" | "name">;
}) {
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<ActionsMenu>
				<DeleteMenuItem onClick={() => setDeleteOpen(true)} />
			</ActionsMenu>
			{deleteOpen && (
				<DeletePipelineAlert
					pipeline={pipeline}
					onClose={() => setDeleteOpen(false)}
				/>
			)}
		</>
	);
}
