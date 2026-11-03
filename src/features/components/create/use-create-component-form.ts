import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";
import type { ApiClientError } from "@/shared/api/errors";

import {
	buildCreateComponentBody,
	componentFormValues,
	submitErrorMessage,
} from "../configure/model";
import type { ComponentFormValues } from "../configure/schema";
import { useComponentForm } from "../configure/use-component-form";
import { componentKeys } from "../data/queries";
import { createComponent } from "../data/requests";
import type { Component, CreateComponentInput, FlavorDetail } from "../model";
import type { ComponentType } from "../type/model";

/**
 * Form and submission for a new Component of `flavor`. Mount it under a key per Flavor:
 * a different Flavor needs a fresh form, as its schema and fields differ.
 */
export function useCreateComponentForm({
	type,
	flavor,
}: {
	type: ComponentType;
	flavor: FlavorDetail;
}) {
	const form = useComponentForm({
		configSchema: flavor.configSchema,
		defaultValues: componentFormValues(),
	});

	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const mutation = useMutation<Component, ApiClientError, CreateComponentInput>(
		{
			mutationFn: createComponent,
			onSuccess: async (component) => {
				await queryClient.invalidateQueries({
					queryKey: componentKeys.lists(),
				});
				toast.success(m.components_create_success({ name: component.name }));
				await navigate({
					to: "/infra/components/$component_id",
					params: { component_id: component.id },
				});
			},
			// The form shows the backend detail; the toast only flags the failure.
			onError: () => {
				toast.error(m.components_create_failed());
			},
		}
	);

	function handleCreate(values: ComponentFormValues) {
		mutation.mutate(
			buildCreateComponentBody({ type, flavorName: flavor.name, values })
		);
	}

	return {
		form,
		handleCreate,
		isPending: mutation.isPending,
		submitError: submitErrorMessage(
			mutation.error,
			m.components_create_failed()
		),
	};
}
