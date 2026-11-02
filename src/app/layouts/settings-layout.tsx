import { Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { ProjectSelect } from "@/features/projects/ui";
import { m } from "@/paraglide/messages";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/shared/ui/sidebar";

import { type SettingsNavItem, useSettingsNav } from "./use-settings-nav";

/** Settings pages beside a secondary sidebar: Server settings, then Project settings. */
export function SettingsLayout() {
	return (
		<SidebarProvider className="min-h-0 flex-1 flex-col lg:flex-row">
			<SettingsSidebar />
			<div className="min-w-0 flex-1">
				<Outlet />
			</div>
		</SidebarProvider>
	);
}

function SettingsSidebar() {
	const {
		filter,
		setFilter,
		sections,
		projects,
		activeProject,
		selectProject,
	} = useSettingsNav();

	return (
		<Sidebar
			collapsible="none"
			className="h-auto w-full shrink-0 border-b lg:w-(--sidebar-width) lg:border-r lg:border-b-0"
		>
			<nav aria-label={m.settings_nav_label()} className="lg:sticky lg:top-0">
				<SidebarHeader className="p-3">
					<div className="relative">
						<Search
							aria-hidden="true"
							className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
						/>
						<SidebarInput
							type="search"
							value={filter}
							onChange={(event) => setFilter(event.target.value)}
							placeholder={m.settings_nav_filter()}
							aria-label={m.settings_nav_filter()}
							className="pl-8"
						/>
					</div>
				</SidebarHeader>
				<SidebarContent className="overflow-visible">
					{sections.length === 0 && (
						<p className="px-5 py-2 text-sm text-muted-foreground">
							{m.settings_nav_no_matches()}
						</p>
					)}
					{sections.map((section) => (
						<SidebarGroup key={section.id} className="px-3">
							<SidebarGroupLabel>{section.label}</SidebarGroupLabel>
							<SidebarGroupContent className="flex flex-col gap-1">
								{section.id === "project" &&
									(projects.length > 0 ? (
										<ProjectSelect
											projects={projects}
											value={activeProject}
											onSelect={selectProject}
											aria-label={m.settings_nav_project_select()}
											className="mb-1 w-full bg-background"
										/>
									) : (
										<p className="px-2 text-sm text-muted-foreground">
											{m.settings_nav_no_projects()}
										</p>
									))}
								<SidebarMenu>
									{section.items.map((item) => (
										<SettingsNavLink key={item.to} item={item} />
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
			</nav>
		</Sidebar>
	);
}

function SettingsNavLink({ item }: { item: SettingsNavItem }) {
	const matchRoute = useMatchRoute();
	const isActive = Boolean(matchRoute({ to: item.to, params: item.params }));

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				isActive={isActive}
				render={
					<Link
						to={item.to}
						params={item.params}
						aria-current={isActive ? "page" : undefined}
					/>
				}
			>
				<span>{item.label}</span>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
