import { NavbarItem } from "@/types/navbar";
import { useLocation } from "@tanstack/react-router";

export function useSidebarItems(items: NavbarItem[]) {
	const location = useLocation();

	return items.map((item) => {
		const subItems = item.items;
		if (subItems && subItems.length > 0) {
			const mappedSubItems = subItems.map((subItem) => ({
				...subItem,
				isActive: subItem.url === location.pathname,
			}));

			const hasActiveSubItem = mappedSubItems.some(
				(subItem) => subItem.isActive
			);

			return {
				...item,
				items: mappedSubItems,
				isActive: hasActiveSubItem,
			};
		}

		return {
			...item,
			isActive: item.url === location.pathname,
		};
	});
}
