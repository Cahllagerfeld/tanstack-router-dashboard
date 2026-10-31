import { useSuspenseQuery } from "@tanstack/react-query";

import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";

import { componentQueries } from "../data/queries";
import type { ComponentType } from "../type/model";
import { TypeFilter } from "../type/type-filter";
import { useComponentColumns } from "./columns";

interface ComponentListProps {
	page: number | undefined;
	size: number | undefined;
	type: ComponentType | undefined;
}

export function ComponentList({ page, size, type }: ComponentListProps) {
	const columns = useComponentColumns();

	const { data } = useSuspenseQuery(
		componentQueries.list({ size, page, type })
	);

	const table = useDataTable({
		data: data.items,
		columns,
	});

	return (
		<TableView title={m.components_list_title()}>
			<TableToolbar>
				<TableToolbar.Start>
					<TypeFilter queryName="type" filter={type} />
				</TableToolbar.Start>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable table={table} />
			<TableFooter page={data} />
		</TableView>
	);
}
