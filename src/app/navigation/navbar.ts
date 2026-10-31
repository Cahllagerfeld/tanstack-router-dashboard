import type { LucideIcon } from "lucide-react";

export type NavbarItem = {
	title: string;
	url: string;
	icon: LucideIcon;
	disabled?: boolean;
	/** When set, item is active if pathname starts with this prefix (e.g. `/settings`). */
	activePathPrefix?: string;
	isActive?: boolean;
};
