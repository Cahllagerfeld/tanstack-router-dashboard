import { Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-m";

import { ProjectSelect } from "@/features/projects/ui";
import { m } from "@/paraglide/messages";
import { ActiveIndicator } from "@/shared/components/active-indicator";
import { cn } from "@/shared/lib/cn";
import { buttonVariants } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { type SettingsNavItem, useSettingsNav } from "./use-settings-nav";

/** Settings pages beside a secondary nav: Server settings, then Project settings. */
export function SettingsLayout() {
	return (
		<div className="flex min-h-0 flex-1 flex-col lg:flex-row">
			<SettingsNav />
			<div className="min-w-0 flex-1">
				<Outlet />
			</div>
		</div>
	);
}

function SettingsNav() {
	const {
		filter,
		setFilter,
		sections,
		projects,
		activeProject,
		selectProject,
	} = useSettingsNav();

	return (
		<div className="w-full shrink-0 border-b bg-sidebar text-sidebar-foreground lg:w-64 lg:border-r lg:border-b-0">
			<nav
				aria-label={m.settings_nav_label()}
				className="relative flex flex-col gap-4 p-3 lg:sticky lg:top-0"
			>
				<div className="relative">
					<Search
						aria-hidden="true"
						className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
					/>
					<Input
						type="search"
						value={filter}
						onChange={(event) => setFilter(event.target.value)}
						placeholder={m.settings_nav_filter()}
						aria-label={m.settings_nav_filter()}
						className="bg-background pl-8"
					/>
				</div>
				{sections.length === 0 && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="px-2 text-sm text-muted-foreground"
					>
						{m.settings_nav_no_matches()}
					</motion.p>
				)}
				<AnimatePresence initial={false} mode="popLayout">
					{sections.map((section) => (
						<motion.section
							key={section.id}
							layout="position"
							{...fade}
							aria-labelledby={`settings-nav-${section.id}`}
							className="flex flex-col gap-1"
						>
							<h2
								id={`settings-nav-${section.id}`}
								className="px-2 py-1 text-xs font-medium text-muted-foreground"
							>
								{section.label}
							</h2>
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
							<ul className="relative flex flex-col gap-0.5">
								<AnimatePresence initial={false} mode="popLayout">
									{section.items.map((item) => (
										<motion.li key={item.to} layout="position" {...fade}>
											<SettingsNavLink item={item} />
										</motion.li>
									))}
								</AnimatePresence>
							</ul>
						</motion.section>
					))}
				</AnimatePresence>
			</nav>
		</div>
	);
}

/** Items fade as the filter hides or restores them; the rest slide into place. */
const fade = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.15 },
};

function SettingsNavLink({ item }: { item: SettingsNavItem }) {
	const matchRoute = useMatchRoute();
	const isActive = Boolean(matchRoute({ to: item.to, params: item.params }));

	return (
		<Link
			to={item.to}
			params={item.params}
			aria-current={isActive ? "page" : undefined}
			className={cn(
				buttonVariants({ variant: "ghost" }),
				"relative isolate w-full justify-start font-normal",
				isActive &&
					"font-medium text-sidebar-accent-foreground hover:bg-transparent dark:hover:bg-transparent"
			)}
		>
			{isActive && (
				<ActiveIndicator
					layoutId="settings-active-indicator"
					className="inset-0 -z-10 rounded-[inherit] bg-sidebar-accent"
				/>
			)}
			{item.label}
		</Link>
	);
}
