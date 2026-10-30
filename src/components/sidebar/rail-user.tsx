import { useSuspenseQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutUser } from "@/data/session/logout";
import { userQueries } from "@/data/user";
import { getAvatarUrl } from "@/lib/avatar";
import { m } from "@/paraglide/messages";

import { railAvatarClassName, railAvatarTriggerClassName } from "./rail-avatar";
import { RailTooltip } from "./rail-tooltip";

export function RailUser() {
	const { data } = useSuspenseQuery(userQueries.currentUser());
	const logout = useLogoutUser();

	return (
		<DropdownMenu>
			<RailTooltip
				label={data.resolvedName}
				trigger={
					<DropdownMenuTrigger
						render={
							<Button
								variant="ghost"
								size="icon-lg"
								aria-label={m.common_navigation_user_menu()}
								className={railAvatarTriggerClassName}
							>
								<UserAvatar name={data.resolvedName} />
							</Button>
						}
					/>
				}
			/>
			<DropdownMenuContent
				className="min-w-56 rounded-lg"
				side="right"
				align="end"
				sideOffset={4}
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel className="p-0 font-normal">
						<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
							<UserAvatar name={data.resolvedName} />
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{data.resolvedName}
								</span>
								<span className="truncate text-xs">{data.email}</span>
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logout.mutate()}>
					<LogOut />
					{m.common_action_logout()}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function UserAvatar({ name }: { name: string }) {
	return (
		<Avatar className={railAvatarClassName}>
			<AvatarImage
				src={getAvatarUrl(name, {
					size: 32,
				})}
			/>
			<AvatarFallback>{name[0]}</AvatarFallback>
		</Avatar>
	);
}
