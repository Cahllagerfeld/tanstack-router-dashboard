import { useSuspenseQuery } from "@tanstack/react-query";

import { useDataTable } from "@/shared/components/tables/use-data-table";

import { snapshotQueries } from "../data/queries";
import type { SnapshotListInput } from "../model";
import { useSnapshotColumns } from "./columns";

export function useSnapshotList(params: SnapshotListInput) {
	const columns = useSnapshotColumns();
	const { data: snapshotPage } = useSuspenseQuery(snapshotQueries.list(params));
	const table = useDataTable({
		data: snapshotPage.items,
		columns,
	});

	return { snapshotPage, table };
}
