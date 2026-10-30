import { Link } from "@tanstack/react-router";

import { RailUser } from "@/components/sidebar/nav-user";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import type { NavbarItem } from "@/types/navbar";

import { RailProjectSwitcher } from "./project-switcher";
import { RailTooltip } from "./rail-tooltip";
import { useNavbarItems } from "./use-navbar-items";

const railLinkClassName = buttonVariants({ variant: "ghost", size: "icon-lg" });

export function AppRail() {
	const { navItems, footerItems } = useNavbarItems();

	return (
		<nav
			aria-label={m.common_navigation_main()}
			className="flex w-14 shrink-0 flex-col items-center gap-2 overflow-y-auto py-3 text-sidebar-foreground"
		>
			<RailProjectSwitcher />
			<Separator className="data-[orientation=horizontal]:w-8" />
			{navItems.map((item) => (
				<RailNavLink key={item.url} item={item} />
			))}
			<div className="mt-auto flex flex-col items-center gap-2">
				{footerItems.map((item) => (
					<RailNavLink key={item.url} item={item} />
				))}
				<RailUser />
			</div>
		</nav>
	);
}

function RailNavLink({ item }: { item: NavbarItem }) {
	if (item.disabled) {
		const label = m.common_navigation_item_under_construction({
			title: item.title,
		});
		return (
			<RailTooltip
				label={label}
				trigger={
					<span
						role="link"
						tabIndex={0}
						aria-disabled="true"
						aria-label={label}
						className={cn(railLinkClassName, "cursor-not-allowed opacity-50")}
					>
						<item.icon aria-hidden="true" />
					</span>
				}
			/>
		);
	}

	return (
		<RailTooltip
			label={item.title}
			trigger={
				<Link
					to={item.url}
					aria-label={item.title}
					aria-current={item.isActive ? "page" : undefined}
					className={cn(
						railLinkClassName,
						item.isActive
							? "bg-foreground/10 text-foreground hover:bg-foreground/20 dark:hover:bg-foreground/20"
							: "hover:bg-foreground/10 dark:hover:bg-foreground/10"
					)}
				>
					<item.icon aria-hidden="true" />
				</Link>
			}
		/>
	);
}
