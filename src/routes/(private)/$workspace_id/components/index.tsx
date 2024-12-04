import { componentQueries } from "@/data/components";
import { typeFilterSchema } from "@/features/filters/type";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const querySchema = z.object({
	type: typeFilterSchema.catch(undefined),
	page: z.number().int().positive().optional().catch(undefined),
	size: z
		.union([
			z.literal(5),
			z.literal(10),
			z.literal(20),
			z.literal(50),
			z.undefined(),
		])
		.catch(20),
});

export const Route = createFileRoute("/(private)/$workspace_id/components/")({
	validateSearch: (search) => querySchema.parse(search),
	loaderDeps: ({ search: { type, page, size } }) => ({ type, page, size }),
	loader: ({
		context: { queryClient },
		params: { workspace_id },
		deps: { type, page, size },
	}) => {
		return queryClient.ensureQueryData(
			componentQueries.workspaceComponentList(workspace_id, {
				type,
				page,
				size,
			})
		);
	},
});
