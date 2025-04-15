import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteProjectAlert } from "../delete/delete-project-alert";

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
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="z-10" size="icon">
						<EllipsisVertical className="size-5" />
						<span className="sr-only">Open project actions</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuGroup>
						<DropdownMenuItem onSelect={() => setDeleteAlertOpen(true)}>
							<Trash2 />
							Delete
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
