import { LucideIcon } from "lucide-react";

export type NavbarItem = {
	title: string;
	url: string;
	icon: LucideIcon;
	/** When set, item is active if pathname starts with this prefix (e.g. `/settings`). */
	activePathPrefix?: string;
	isActive?: boolean;
	items?: NavbarSubItem[];
};

export type NavbarSubItem = {
	title: string;
	url: string;
	isActive?: boolean;
};

export type SecondaryNavbarItem = NavbarSubItem & {
	icon: LucideIcon;
};
