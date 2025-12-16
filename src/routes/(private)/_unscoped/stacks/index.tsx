import { stackQueries } from "@/data/stacks";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { createFileRoute } from "@tanstack/react-router";

const querySchema = commonFilterSchema;

export const Route = createFileRoute("/(private)/_unscoped/stacks/")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { page, size } }) => ({ page, size }),
	loader: ({ context: { queryClient }, deps: { page, size } }) => {
		return queryClient.ensureQueryData(
			stackQueries.list({
				page,
				size,
			})
		);
	},
	head: () => ({
		meta: [{ title: "Stacks" }],
	}),
});
