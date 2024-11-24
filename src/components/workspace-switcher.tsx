import { ChevronsUpDown } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { serverQueries } from "@/data/server";
import { workspaceQueries } from "@/data/workspaces";
import { getAvatarUrl } from "@/lib/avatar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Avatar, AvatarImage } from "./ui/avatar";

export function WorkspaceSwitcher({}) {
	const navigate = useNavigate();
	const { data: serverData } = useSuspenseQuery(serverQueries.serverInfo());
	const { data: workspaceData } = useSuspenseQuery(
		workspaceQueries.workspaceList()
	);
	const { workspace_id } = useParams({
		from: "/(private)/$workspace_id",
	});

	const activeWorkspace = workspaceData.items.find(
		(workspace) => workspace.id === workspace_id
	)?.name;

	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="size-8 shrink-0 rounded-md">
								<AvatarImage
									src={getAvatarUrl(activeWorkspace || "", {
										size: 32,
									})}
								/>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{serverData.name}
								</span>
								<span className="truncate text-xs">{activeWorkspace}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Workspaces
						</DropdownMenuLabel>
						{workspaceData.items.map((ws, index) => (
							<DropdownMenuItem
								key={ws.id}
								onClick={() =>
									navigate({
										to: "/$workspace_id",
										params: { workspace_id: ws.id },
									})
								}
								className="gap-2 p-2"
							>
								<Avatar className="size-6 shrink-0 rounded-md">
									<AvatarImage src={getAvatarUrl(ws.name, { size: 24 })} />
								</Avatar>

								{ws.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						{/* <DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-background">
								<Plus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">Add team</div>
						</DropdownMenuItem> */}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
