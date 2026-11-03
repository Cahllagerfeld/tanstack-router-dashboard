import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import {
	TableEmpty,
	TableNoMatches,
} from "@/shared/components/tables/table-empty";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";
import { getEntityIcon } from "@/shared/lib/entity-icons";
import { buttonVariants } from "@/shared/ui/button";

import { componentQueries } from "../data/queries";
import type { ComponentType } from "../type/model";
import { TypeFilter } from "../type/type-filter";
import { useClearTypeFilter } from "../type/use-type-filter";
import { useComponentColumns } from "./columns";

interface ComponentListProps {
	page: number | undefined;
	size: number | undefined;
	type: ComponentType | undefined;
}

export function ComponentList({ page, size, type }: ComponentListProps) {
	const columns = useComponentColumns();
	const clearType = useClearTypeFilter();

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
					<NewComponentLink />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable
				table={table}
				empty={
					type ? (
						<TableNoMatches onClear={clearType} />
					) : (
						<TableEmpty
							icon={getEntityIcon("component")}
							title={m.components_empty_title()}
							description={m.components_empty_description()}
							action={<NewComponentLink />}
						/>
					)
				}
			/>
			<TableFooter page={data} />
		</TableView>
	);
}

function NewComponentLink() {
	return (
		<Link to="/infra/components/create" className={buttonVariants()}>
			<Plus aria-hidden />
			{m.components_create_action()}
		</Link>
	);
}
