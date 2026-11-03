export type ColumnWidthInput = {
	size: number;
	/** A fixed column, such as row selection or actions, keeps its size exactly. */
	fixed: boolean;
};

/**
 * Stretches the flexible columns to fill the table, keeping their proportions.
 * Fixed columns keep their size, so selection stays narrow at the start and
 * actions stay narrow at the end. Columns never shrink below their size: a
 * table wider than its container scrolls instead.
 */
export function fitColumnWidths(
	columns: ColumnWidthInput[],
	tableWidth: number
): number[] {
	let fixedTotal = 0;
	let flexibleTotal = 0;
	for (const column of columns) {
		if (column.fixed) fixedTotal += column.size;
		else flexibleTotal += column.size;
	}

	const scale =
		flexibleTotal > 0
			? Math.max(1, (tableWidth - fixedTotal) / flexibleTotal)
			: 1;

	return columns.map((column) =>
		column.fixed ? column.size : column.size * scale
	);
}
