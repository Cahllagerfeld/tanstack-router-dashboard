import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ensureCurrentIdentity, sessionKeys } from "../data/queries";
import { loginUserRequest } from "../data/requests";
import { type LoginFormType, loginSchema } from "./schema";

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

	const { mutate } = useMutation({
		mutationFn: loginUserRequest,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: sessionKeys.currentIdentity(),
			});
			// Ensure cache is warm for guards
			await ensureCurrentIdentity(queryClient);
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
