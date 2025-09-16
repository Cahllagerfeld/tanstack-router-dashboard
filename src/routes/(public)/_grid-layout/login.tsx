import { createFileRoute } from "@tanstack/react-router";
import { redirectIfAuthenticated } from "@/lib/auth-guards";
import { z } from "zod";

const querySchema = z.object({
	next: z.string().optional(),
});

export const Route = createFileRoute("/(public)/_grid-layout/login")({
	validateSearch: (search) => querySchema.parse(search),
	beforeLoad: async ({ context: { queryClient }, search: { next } }) => {
		await redirectIfAuthenticated(queryClient, next ?? "/");
	},
});
