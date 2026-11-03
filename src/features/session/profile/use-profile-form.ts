import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";

import { sessionKeys } from "../data/queries";
import { updateCurrentUser } from "../data/requests";
import type { CurrentIdentity } from "../model";
import { profileChanges, profileFormValues } from "./model";
import { type ProfileFormValues, profileSchema } from "./schema";

export function useProfileForm(identity: CurrentIdentity) {
	const queryClient = useQueryClient();
	const [initialValues] = useState(() => profileFormValues(identity));
	// The values the form was loaded or last saved with; edits are diffed against these.
	const saved = useRef(initialValues);
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: initialValues,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: (updated) => {
			queryClient.setQueryData(sessionKeys.currentIdentity(), updated);
			saved.current = profileFormValues(updated);
			form.reset(saved.current);
			toast.success(m.session_profile_updated());
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	function handleSubmit(values: ProfileFormValues) {
		const changes = profileChanges(saved.current, values);
		if (Object.keys(changes).length === 0) {
			form.reset(values);
			return;
		}
		mutate(changes);
	}

	return { form, isPending, handleSubmit };
}
