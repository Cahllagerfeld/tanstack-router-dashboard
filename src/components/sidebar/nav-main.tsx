import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { m } from "@/paraglide/messages";
import type { NavbarItem } from "@/types/navbar";

export function NavMain({
	items,
	label,
}: {
	label?: string;
	items: NavbarItem[];
}) {
	return (
		<SidebarGroup>
			{label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						render={
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={item.isActive}
									disabled={item.disabled}
									render={
										item.disabled ? undefined : (
											<Link to={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										)
									}
								>
									{item.disabled && (
										<>
											<item.icon />
											<span>{item.title}</span>
											<Badge
												variant="outline"
												className="ml-auto hidden shrink-0 px-1.5 text-[10px] group-data-[collapsible=icon]:hidden sm:inline-flex"
											>
												{m.common_navigation_under_construction()}
											</Badge>
										</>
									)}
								</SidebarMenuButton>
								{item.items?.length ? (
									<>
										<CollapsibleTrigger
											render={
												<SidebarMenuAction className="data-[state=open]:rotate-90">
													<ChevronRight />
													<span className="sr-only">
														{m.navigation_submenu_toggle({
															title: item.title,
														})}
													</span>
												</SidebarMenuAction>
											}
										></CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton
															isActive={subItem.isActive}
															render={
																<Link to={subItem.url}>
																	<span>{subItem.title}</span>
																</Link>
															}
														></SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</>
								) : null}
							</SidebarMenuItem>
						}
					></Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
