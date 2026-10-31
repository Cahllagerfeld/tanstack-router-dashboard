/** One page of a list, in the shape the backend returns. */
export type Page<Item> = {
	index: number;
	max_size: number;
	total: number;
	total_pages: number;
	items: Item[];
};

export function mapPage<From, To>(
	page: Page<From>,
	mapItem: (item: From) => To
): Page<To> {
	return {
		...page,
		items: page.items.map(mapItem),
	};
}

/** The 1-based positions of the rows on a page of a list. */
export function getPageRange({
	index,
	max_size,
	total,
}: Pick<Page<unknown>, "index" | "max_size" | "total">) {
	return {
		start: Math.min((index - 1) * max_size + 1, total),
		end: Math.min(index * max_size, total),
	};
}
