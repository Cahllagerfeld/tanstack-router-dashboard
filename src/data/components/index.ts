import { createResourceQueries } from "../query-factory";
import { apiPaths } from "../api";
import {
	Component,
	ComponentsList,
	ComponentsListQueryParams,
} from "@/types/components";

export const componentQueries = createResourceQueries<
	ComponentsList,
	Component,
	ComponentsListQueryParams
>({
	baseKey: "components",
	endpoints: {
		base: apiPaths.components.base,
	},
});
