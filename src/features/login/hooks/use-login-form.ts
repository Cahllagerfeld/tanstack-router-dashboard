import { useLoginUser } from "@/data/session/login";
import { userQueries } from "@/data/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
	username: z.string().trim().min(1, "Username is required"),
	password: z.string().trim().min(1, "Password is required"),
});

type LoginFormType = z.infer<typeof loginSchema>;

export function useLoginForm() {
	const { next } = useSearch({ from: "/(public)/_grid-layout/login" });
	const router = useRouter();
	const queryClient = useQueryClient();

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const { mutate } = useLoginUser({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["current-user"] });
			// Ensure cache is warm for guards
			await queryClient.ensureQueryData(userQueries.currentUser());
			router.navigate({ to: next ?? "/" });
		},
		onError: (err) => {
			// @ts-expect-error - detail is an array
			toast.error(err.data.detail[1]);
		},
	});

	function handleLogin(values: LoginFormType) {
		mutate(values);
	}

	return { handleLogin, form };
}
