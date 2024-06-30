import { z } from "zod";

export const loginFormSchema = z.object({
	username: z.string().min(1),
	password: z.string().optional()
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
