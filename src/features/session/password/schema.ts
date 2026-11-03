import { z } from "zod";

import { m } from "@/paraglide/messages";

/** Passwords are compared exactly as typed; surrounding whitespace counts. */
export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, m.session_password_current_required()),
		newPassword: z.string().min(8, m.session_password_minimum()),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword !== data.currentPassword, {
		path: ["newPassword"],
		message: m.session_password_unchanged(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		path: ["confirmPassword"],
		message: m.session_password_mismatch(),
	});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
