import { Trash2 } from "lucide-react";
import { useState } from "react";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/ui/button";

import type { Component } from "../model";
import { DeleteComponentAlert } from "./delete-component-alert";

export function DeleteComponentAction({ component }: { component: Component }) {
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<Button
				variant="destructive"
				size="sm"
				onClick={() => setDeleteOpen(true)}
			>
				<Trash2 />
				{m.components_action_delete()}
			</Button>
			{deleteOpen && (
				<DeleteComponentAlert
					component={component}
					onClose={() => setDeleteOpen(false)}
				/>
			)}
		</>
	);
}
