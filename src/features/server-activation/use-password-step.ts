import { serverQueries } from "@/data/server";
import { useServerActivation } from "@/data/server/activate-server";
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

const passwordStepSchema = z
	.object({
		username: z.string().trim().min(1),
		password: z
			.string()
			.trim()
			.min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().trim(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{ path: ["confirmPassword"], message: "Passwords do not match" }
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
			toast.success("Server activated!");
			await queryClient.invalidateQueries({
				queryKey: serverQueries.infoKey,
				refetchType: "all",
			});
			await navigate({ to: "/login" });
		},
		onError: (e) => {
			console.error(e);
			toast.error("Failed to activate server");
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
