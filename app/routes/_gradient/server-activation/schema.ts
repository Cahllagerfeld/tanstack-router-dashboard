import { z } from "zod";

export const serverActivationSchema = z.object({
	admin_password: z.string().min(1),
	server_name: z.string().min(1),
	admin_username: z.string().min(1)
});
