import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ActivateUserInput } from "../model";
import { type ActivateUserFormValues, activateUserSchema } from "./schema";

type Options = {
	userId: string;
	token: string;
	onActivate: (input: ActivateUserInput) => void;
};

export function useActivateUserForm({ userId, token, onActivate }: Options) {
	const form = useForm<ActivateUserFormValues>({
		resolver: zodResolver(activateUserSchema),
		defaultValues: {
			fullName: "",
			password: "",
			confirmPassword: "",
		},
	});

	function handleActivate(values: ActivateUserFormValues) {
		onActivate({
			userId,
			body: {
				activation_token: token,
				password: values.password,
				...(values.fullName ? { full_name: values.fullName } : {}),
			},
		});
	}

	return { form, handleActivate };
}
