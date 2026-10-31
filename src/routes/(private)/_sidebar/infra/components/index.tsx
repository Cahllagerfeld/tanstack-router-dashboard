import { createFileRoute } from "@tanstack/react-router";

import { componentQueries, typeFilterSchema } from "@/features/components";
import { ComponentList } from "@/features/components/ui";
import { m } from "@/paraglide/messages";
import { commonFilterSchema } from "@/shared/filters/common-filter-schema";

const querySchema = commonFilterSchema.extend({
	type: typeFilterSchema.catch(undefined),
});

export const Route = createFileRoute("/(private)/_sidebar/infra/components/")({
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
		meta: [{ title: m.components_list_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { size, page, type } = Route.useSearch();

	return <ComponentList page={page} size={size} type={type} />;
}
