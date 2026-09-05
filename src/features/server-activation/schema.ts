import { z } from "zod";

import { m } from "@/paraglide/messages";

export const passwordStepSchema = z
	.object({
		username: z.string().trim().min(1, m.server_activation_username_required()),
		password: z.string().trim().min(8, m.server_activation_password_minimum()),
		confirmPassword: z.string().trim(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			path: ["confirmPassword"],
			message: m.server_activation_password_mismatch(),
		}
	);

export type PasswordForm = z.infer<typeof passwordStepSchema>;
