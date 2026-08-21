import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { PropsWithChildren } from "react";

export function BaseTableActions({ children }: PropsWithChildren) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="icon">
						<MoreHorizontal />
						<span className="sr-only">Open menu</span>
					</Button>
				}
			/>
			<DropdownMenuContent className="w-48" align="end" sideOffset={7}>
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
