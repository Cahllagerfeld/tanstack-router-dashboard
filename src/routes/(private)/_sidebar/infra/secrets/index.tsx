import { createFileRoute } from "@tanstack/react-router";

import { secretQueries } from "@/features/secrets";
import { SecretList } from "@/features/secrets/ui";
import { m } from "@/paraglide/messages";
import { commonFilterSchema } from "@/shared/filters/common-filter-schema";

const querySchema = commonFilterSchema;

export const Route = createFileRoute("/(private)/_sidebar/infra/secrets/")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { page, size } }) => ({ page, size }),
	loader: ({ context: { queryClient }, deps: { page, size } }) => {
		return queryClient.ensureQueryData(
			secretQueries.list({
				page,
				size,
			})
		);
	},
	head: () => ({
		meta: [{ title: m.secrets_list_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { size, page } = Route.useSearch();

	return <SecretList page={page} size={size} />;
}
