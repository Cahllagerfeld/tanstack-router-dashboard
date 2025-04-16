import { LucideIcon } from "lucide-react";

export type NavbarItem = {
	title: string;
	url: string;
	icon: LucideIcon;
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
