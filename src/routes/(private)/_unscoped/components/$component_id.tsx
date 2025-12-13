import { z } from "zod";
import { componentQueries } from "@/data/components";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ComponentDetailSkeleton } from "@/features/components/detail/component-detail-skeleton";

const searchSchema = z.object({
	tab: z.enum(["general", "stacks"]).catch("general"),
});

export const Route = createFileRoute(
	"/(private)/_unscoped/components/$component_id"
)({
	validateSearch: searchSchema,
	loader: async ({ context: { queryClient }, params: { component_id } }) => {
		const component = await queryClient.ensureQueryData(
			componentQueries.detail(component_id)
		);

		if (!component) notFound();
		return { component };
	},
	head({ loaderData }) {
		if (!loaderData?.component)
			return { meta: [{ title: "Component Not Found" }] };
		return {
			meta: [{ title: `Component ${loaderData.component.name}` }],
		};
	},
	pendingComponent: ComponentDetailSkeleton,
});
