import { MoreHorizontal, Trash2 } from "lucide-react";
import type { PropsWithChildren } from "react";

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

/** The destructive item that opens a record's delete confirmation. */
export function DeleteMenuItem({ onClick }: { onClick: () => void }) {
	return (
		<DropdownMenuItem variant="destructive" onClick={onClick}>
			<Trash2 />
			<span>{m.common_action_delete()}</span>
		</DropdownMenuItem>
	);
}
