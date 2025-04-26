import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const querySchema = z.object({
	next: z.string().optional(),
});

export const Route = createFileRoute("/(public)/_grid-layout/login")({
	validateSearch: (search) => querySchema.parse(search),
	beforeLoad: ({ context, search: { next } }) => {
		if (context.auth.isAuthenticated) throw redirect({ to: next ?? "/" });
	},
});
