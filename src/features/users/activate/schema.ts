import { z } from "zod";

import { m } from "@/paraglide/messages";

export const activateUserSchema = z
	.object({
		fullName: z.string().trim().optional(),
		password: z.string().min(8, m.users_activate_password_minimum()),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: m.users_activate_password_mismatch(),
	});

export type ActivateUserFormValues = z.infer<typeof activateUserSchema>;
