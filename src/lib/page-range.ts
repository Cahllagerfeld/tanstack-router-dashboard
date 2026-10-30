type Page = {
	index: number;
	max_size: number;
	total: number;
};

/** The 1-based positions of the rows on a page of a list. */
export function getPageRange({ index, max_size, total }: Page) {
	return {
		start: Math.min((index - 1) * max_size + 1, total),
		end: Math.min(index * max_size, total),
	};
}
