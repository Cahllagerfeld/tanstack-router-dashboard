import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";
import { isFetchError } from "@/shared/api/errors";
import type { ApiClientError } from "@/types/api";

import { projectKeys } from "../data/queries";
import { createProject } from "../data/requests";
import type { CreateProjectInput, Project } from "../model";
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

	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate } = useMutation<Project, ApiClientError, CreateProjectInput>({
		mutationFn: createProject,
		onSuccess: (project) => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
			toast.success(
				m.projects_notification_created({
					displayName: project.displayName ?? project.name,
				})
			);
			navigate({
				to: "/projects/$project_id",
				params: { project_id: project.name },
			});
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
