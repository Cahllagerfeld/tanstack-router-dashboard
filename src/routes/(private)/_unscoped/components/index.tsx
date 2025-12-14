import { componentQueries } from "@/data/components";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { typeFilterSchema } from "@/features/filters/type";
import { createFileRoute } from "@tanstack/react-router";

const querySchema = commonFilterSchema.extend({
	type: typeFilterSchema.catch(undefined),
});

export const Route = createFileRoute("/(private)/_unscoped/components/")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { type, page, size } }) => ({ type, page, size }),
	loader: ({ context: { queryClient }, deps: { type, page, size } }) => {
		return queryClient.ensureQueryData(
			componentQueries.list({
				type,
				page,
				size,
			})
		);
	},
	head: () => ({
		meta: [{ title: "Components" }],
	}),
});
