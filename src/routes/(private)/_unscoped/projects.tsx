import { projectQueries } from "@/data/projects";
import { filterSchema } from "@/features/filters/filter";
import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guards";
import { z } from "zod";

const querySchema = z.object({
	name: filterSchema.optional().catch(undefined),
	page: z.number().optional().catch(1),
});

export const Route = createFileRoute("/(private)/_unscoped/projects")({
	validateSearch: (search) => querySchema.parse(search),
	loaderDeps: ({ search: { name, page } }) => ({ name, page }),
	beforeLoad: async ({ context: { queryClient } }) => {
		await requireAuth(queryClient);
	},
	loader: async ({ context: { queryClient }, deps: { name, page } }) => {
		await queryClient.ensureQueryData(projectQueries.list({ name, page }));
	},
	head: () => ({
		meta: [{ title: "Projects" }],
	}),
});
