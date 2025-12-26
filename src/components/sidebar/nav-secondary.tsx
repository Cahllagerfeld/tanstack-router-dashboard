import * as React from "react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SecondaryNavbarItem } from "@/types/navbar";

export function NavSecondary({
	items,
	...props
}: {
	items: SecondaryNavbarItem[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								render={
									<a href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								}
								size="sm"
							></SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
