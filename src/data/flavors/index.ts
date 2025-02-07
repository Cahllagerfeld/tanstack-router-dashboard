import { queryOptions } from "@tanstack/react-query";
import { fetchFlavorsList } from "./queries/flavor-list";
import { FlavorListQueryParams } from "@/types/flavor";
import { fetchFlavorDetail } from "./queries/flavor-detail";

export const flavorQueries = {
	flavorList: (params: FlavorListQueryParams = {}) =>
		queryOptions({
			queryKey: ["flavors", params],
			queryFn: () => fetchFlavorsList({ params }),
		}),
	flavorDetail: (flavorId: string) =>
		queryOptions({
			queryKey: ["flavors", flavorId],
			queryFn: () => fetchFlavorDetail({ id: flavorId }),
		}),
};
