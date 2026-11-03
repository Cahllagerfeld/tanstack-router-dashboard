import { createFileRoute } from "@tanstack/react-router";

import {
	componentQueries,
	createComponentSearchSchema,
	selectableFlavorId,
} from "@/features/components";
import { CreateComponentFlow } from "@/features/components/ui";
import { m } from "@/paraglide/messages";
import { isFetchError } from "@/shared/api/errors";

export const Route = createFileRoute(
	"/(private)/_sidebar/infra/components/create"
)({
	validateSearch: createComponentSearchSchema,
	loaderDeps: ({ search: { type, flavor } }) => ({ type, flavor }),
	loader: async ({ context: { queryClient }, deps: { type, flavor } }) => {
		const flavorDetail =
			type && flavor
				? await queryClient
						.ensureQueryData(componentQueries.flavorDetail(flavor))
						.catch((error: unknown) => {
							// A stale or mistyped link falls back to the Flavor step.
							if (isFetchError(error) && error.status === 404) return undefined;
							throw error;
						})
				: undefined;
		const flavorId = selectableFlavorId(flavorDetail, type);

		// The Flavor step needs the list; the Configure step needs only the detail.
		if (type && !flavorId)
			await queryClient.ensureQueryData(componentQueries.flavorList({ type }));

		return { crumb: m.components_create_title(), flavorId };
	},
	head: () => ({
		meta: [{ title: m.components_create_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { type } = Route.useSearch();
	const { flavorId } = Route.useLoaderData();

	return <CreateComponentFlow type={type} flavorId={flavorId} />;
}
