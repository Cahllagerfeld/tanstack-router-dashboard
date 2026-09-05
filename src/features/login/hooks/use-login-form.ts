import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useLoginUser } from "@/data/session/login";
import { userKeys, userQueries } from "@/data/user";

import { type LoginFormType, loginSchema } from "../schema";

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
			await queryClient.invalidateQueries({ queryKey: userKeys.current() });
			// Ensure cache is warm for guards
			await queryClient.ensureQueryData(userQueries.currentUser());
			router.navigate({ to: next ?? "/" });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	function handleLogin(values: LoginFormType) {
		mutate(values);
	}

	return { handleLogin, form };
}
