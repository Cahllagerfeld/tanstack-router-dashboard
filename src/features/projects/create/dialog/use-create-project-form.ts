import { useCreateProject } from "@/data/projects/mutations/create-project";
import { isFetchError } from "@/lib/fetch-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type CreateProjectForm, createProjectSchema } from "./schema";

export function useCreateProjectForm(
	setOpen: Dispatch<SetStateAction<boolean>>
) {
	const form = useForm<CreateProjectForm>({
		resolver: zodResolver(createProjectSchema),
		defaultValues: {
			name: "",
			displayName: "",
			description: "",
		},
	});

	const { mutate } = useCreateProject({
		onSuccess: () => {
			setOpen(false);
		},
		onError: (error) => {
			if (isFetchError(error)) {
				toast.error(error.message);
			}
		},
	});

	function handleCreateProject(vals: CreateProjectForm) {
		mutate({
			name: vals.name,
			description: vals.description,
			display_name: vals.displayName,
		});
	}

	return { form, handleCreateProject };
}
