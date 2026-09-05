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
