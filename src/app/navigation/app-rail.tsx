import { Link } from "@tanstack/react-router";

import { RailProjectSwitcher } from "@/components/sidebar/project-switcher";
import { useNavbarItems } from "@/components/sidebar/use-navbar-items";
import { m } from "@/paraglide/messages";
import { cn } from "@/shared/lib/cn";
import { buttonVariants } from "@/shared/ui/button";
import type { NavbarItem } from "@/types/navbar";

import { RailTooltip } from "./rail-tooltip";
import { RailUser } from "./rail-user";

const railLinkClassName = cn(
	buttonVariants({ variant: "ghost", size: "icon-lg" }),
	"[&_svg:not([class*='size-'])]:size-5"
);

export function AppRail() {
	const { navItems, footerItems } = useNavbarItems();

	return (
		<nav
			aria-label={m.common_navigation_main()}
			className="flex w-14 shrink-0 flex-col items-center gap-2 overflow-y-auto py-3 text-sidebar-foreground"
		>
			<div className="flex flex-col items-center gap-3">
				<RailProjectSwitcher />
				{navItems.map((item) => (
					<RailNavLink key={item.url} item={item} />
				))}
			</div>
			<div className="mt-auto flex flex-col items-center gap-3">
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
							? "bg-background text-foreground shadow-xs hover:bg-background dark:hover:bg-background"
							: "hover:bg-foreground/10 dark:hover:bg-foreground/10"
					)}
				>
					<item.icon aria-hidden="true" />
				</Link>
			}
		/>
	);
}
