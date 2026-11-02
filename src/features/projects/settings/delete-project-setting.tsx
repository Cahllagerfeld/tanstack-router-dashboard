import { useState } from "react";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/ui/button";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldTitle,
} from "@/shared/ui/field";

import { DeleteProjectAlert } from "../delete/delete-project-alert";
import type { Project } from "../model";

/** Deletes a Project after confirmation. */
export function DeleteProjectSetting({ project }: { project: Project }) {
	const [confirming, setConfirming] = useState(false);

	return (
		<FieldGroup>
			<Field orientation="responsive">
				<FieldContent>
					<FieldTitle>{m.projects_settings_delete_title()}</FieldTitle>
					<FieldDescription>
						{m.projects_settings_delete_description()}
					</FieldDescription>
				</FieldContent>
				<Button
					variant="destructive"
					className="shrink-0"
					onClick={() => setConfirming(true)}
				>
					{m.projects_navigation_delete()}
				</Button>
			</Field>
			{confirming && (
				<DeleteProjectAlert
					project={project}
					onClose={() => setConfirming(false)}
				/>
			)}
		</FieldGroup>
	);
}
