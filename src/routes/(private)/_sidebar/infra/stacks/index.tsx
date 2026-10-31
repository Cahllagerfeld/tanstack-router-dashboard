import { createFileRoute } from "@tanstack/react-router";

import { stackQueries } from "@/features/stacks";
import { StackList } from "@/features/stacks/ui";
import { m } from "@/paraglide/messages";
import { commonFilterSchema } from "@/shared/filters/common-filter-schema";

const querySchema = commonFilterSchema;

export const Route = createFileRoute("/(private)/_sidebar/infra/stacks/")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { page, size } }) => ({ page, size }),
	loader: async ({ context: { queryClient }, deps: { page, size } }) => {
		await queryClient.ensureQueryData(
			stackQueries.list({
				page,
				size,
			})
		);
	},
	head: () => ({
		meta: [{ title: m.stacks_list_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { size, page } = Route.useSearch();

	return <StackList page={page} size={size} />;
}
