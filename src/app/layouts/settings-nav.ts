export type SettingsNavSection<Item extends { label: string }> = {
	label: string;
	items: Item[];
};

function normalize(text: string) {
	return text.trim().toLocaleLowerCase();
}

/**
 * The settings sections that match a filter. A matching section label keeps all
 * of its items; otherwise only matching items remain, and empty sections drop.
 */
export function filterSettingsSections<
	Item extends { label: string },
	Section extends SettingsNavSection<Item>,
>(sections: Section[], filter: string): Section[] {
	const query = normalize(filter);
	if (!query) return sections;

	return sections.flatMap((section) => {
		if (normalize(section.label).includes(query)) return [section];
		const items = section.items.filter((item) =>
			normalize(item.label).includes(query)
		);
		return items.length > 0 ? [{ ...section, items }] : [];
	});
}
