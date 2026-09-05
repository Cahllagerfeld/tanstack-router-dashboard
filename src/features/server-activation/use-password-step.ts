import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	adjectives,
	animals,
	colors,
	uniqueNamesGenerator,
} from "unique-names-generator";
import { z } from "zod";

import { serverKeys } from "@/data/server";
import { useServerActivation } from "@/data/server/activate-server";
import { m } from "@/paraglide/messages";

const passwordStepSchema = z
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
type PasswordForm = z.infer<typeof passwordStepSchema>;

export function usePasswordStep() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const form = useForm<PasswordForm>({
		resolver: zodResolver(passwordStepSchema),
		defaultValues: {
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	const { mutate } = useServerActivation({
		onSuccess: async () => {
			toast.success(m.server_activation_success());
			await queryClient.invalidateQueries({
				queryKey: serverKeys.info(),
				refetchType: "all",
			});
			await navigate({ to: "/" });
		},
		onError: (e) => {
			console.error(e);
			toast.error(m.server_activation_failed());
		},
	});

	async function activationHandler(values: PasswordForm) {
		mutate({
			admin_username: values.username,
			admin_password: values.password,
			server_name: uniqueNamesGenerator({
				dictionaries: [adjectives, colors, animals],
				separator: "-",
			}),
		});
	}

	return { form, mutate, activationHandler };
}
