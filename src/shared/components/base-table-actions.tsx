import { MoreHorizontal } from "lucide-react";
import type { PropsWithChildren } from "react";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export function BaseTableActions({ children }: PropsWithChildren) {
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
