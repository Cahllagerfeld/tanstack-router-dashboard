import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";

import { updateCurrentUser } from "../data/requests";
import { type ChangePasswordFormValues, changePasswordSchema } from "./schema";

const emptyValues: ChangePasswordFormValues = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
};

export function useChangePasswordForm() {
	const form = useForm<ChangePasswordFormValues>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: emptyValues,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: () => {
			form.reset(emptyValues);
			toast.success(m.session_password_changed());
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	function handleSubmit(values: ChangePasswordFormValues) {
		mutate({
			old_password: values.currentPassword,
			password: values.newPassword,
		});
	}

	return { form, isPending, handleSubmit };
}
