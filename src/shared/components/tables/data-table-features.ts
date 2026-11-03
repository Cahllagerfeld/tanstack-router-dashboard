import {
	columnResizingFeature,
	columnSizingFeature,
	columnVisibilityFeature,
	metaHelper,
	rowPaginationFeature,
	rowSelectionFeature,
	tableFeatures,
} from "@tanstack/react-table";

export interface DataTableColumnMeta {
	className?: string;
}

/**
 * Shared starting widths, so the same kind of column lines up across tables.
 * The fixed table scales every size by the same factor to fill its width, so
 * sizes set proportions; a column without one gets the default size.
 */
export const columnSize = {
	select: { size: 32, minSize: 32, maxSize: 32 },
	/** The record's name, which usually needs the most room. */
	name: { size: 320 },
	actions: { size: 80, minSize: 80, maxSize: 80 },
	/** A short status or flag rendered as a badge. */
	badge: { size: 120 },
	/** A person's name, such as an author or creator. */
	person: { size: 180 },
	/** A `DisplayDate`, which spells out the month and time. */
	date: { size: 180 },
} as const;

// The selectable list tables use the same feature set as the shadcn data-table
// pattern, while pagination remains server-owned by the route query state.
export const features = tableFeatures({
	columnVisibilityFeature,
	columnSizingFeature,
	columnResizingFeature,
	rowPaginationFeature,
	rowSelectionFeature,
	columnMeta: metaHelper<DataTableColumnMeta>(),
});

export type DataTableFeatures = typeof features;
