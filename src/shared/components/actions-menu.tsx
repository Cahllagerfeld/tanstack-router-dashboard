import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { ComponentProps, PropsWithChildren } from "react";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

/** The "..." menu of actions for one record, in a table row or a Detail Screen header. */
export function ActionsMenu({ children }: PropsWithChildren) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="icon">
						<MoreHorizontal />
						<span className="sr-only">{m.common_navigation_open_menu()}</span>
					</Button>
				}
			/>
			<DropdownMenuContent className="w-48" align="end" sideOffset={7}>
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** The item that opens a record's edit page; `render` is the link to it. */
export function EditMenuItem({
	render,
}: {
	render: ComponentProps<typeof DropdownMenuItem>["render"];
}) {
	return (
		<DropdownMenuItem render={render}>
			<Pencil />
			<span>{m.common_action_edit()}</span>
		</DropdownMenuItem>
	);
}

/** The destructive item that opens a record's delete confirmation. */
export function DeleteMenuItem({ onClick }: { onClick: () => void }) {
	return (
		<DropdownMenuItem variant="destructive" onClick={onClick}>
			<Trash2 />
			<span>{m.common_action_delete()}</span>
		</DropdownMenuItem>
	);
}
