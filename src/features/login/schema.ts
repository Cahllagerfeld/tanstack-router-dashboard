import { z } from "zod";

import { m } from "@/paraglide/messages";

export const loginSchema = z.object({
	username: z.string().trim().min(1, m.auth_validation_username_required()),
	password: z.string().trim().min(1, m.auth_validation_password_required()),
});

export type LoginFormType = z.infer<typeof loginSchema>;
