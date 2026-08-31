import { DeleteProjectAlert } from "../delete/delete-project-alert";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { m } from "@/paraglide/messages";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
	projectId: string;
};
export function ProjectActions({ projectId }: Props) {
	const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

	return (
		<>
			<DeleteProjectAlert
				projectId={projectId}
				open={deleteAlertOpen}
				setOpen={setDeleteAlertOpen}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button variant="ghost" className="z-10" size="icon">
							<MoreHorizontal className="size-5" />
							<span className="sr-only">{m.projects_actions_open()}</span>
						</Button>
					}
				></DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => setDeleteAlertOpen(true)}>
							<Trash2 />
							{m.common_action_delete()}
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
