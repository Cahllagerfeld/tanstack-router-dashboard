import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";
import type { ApiClientError } from "@/shared/api/errors";

import {
	buildUpdateComponentBody,
	componentFormValues,
	submitErrorMessage,
} from "../configure/model";
import type { ComponentFormValues } from "../configure/schema";
import { useComponentForm } from "../configure/use-component-form";
import { componentKeys } from "../data/queries";
import { updateComponent } from "../data/requests";
import type { Component, FlavorDetail, UpdateComponentInput } from "../model";

type Options = {
	component: Component;
	flavor: FlavorDetail;
};

/** Edits a stored Component's name and configuration; its type and Flavor stay fixed. */
export function useEditComponentForm({ component, flavor }: Options) {
	const form = useComponentForm({
		configSchema: flavor.configSchema,
		defaultValues: componentFormValues(component),
	});

	const navigate = useNavigate();
	const backToDetail = () =>
		navigate({
			to: "/infra/components/$component_id",
			params: { component_id: component.id },
		});

	const queryClient = useQueryClient();
	const { mutate, isPending, error } = useMutation<
		Component,
		ApiClientError,
		UpdateComponentInput
	>({
		mutationFn: updateComponent,
		onSuccess: async (updated) => {
			queryClient.setQueryData(componentKeys.detail(updated.id), updated);
			void queryClient.invalidateQueries({ queryKey: componentKeys.lists() });
			toast.success(m.components_edit_success({ name: updated.name }));
			await backToDetail();
		},
		// The form shows the backend detail; the toast only flags the failure.
		onError: () => {
			toast.error(m.components_edit_failed());
		},
	});

	function handleSubmit(values: ComponentFormValues) {
		const body = buildUpdateComponentBody({ saved: component, values });
		// Nothing changed, or only whitespace that trims back to the saved name.
		if (!body) {
			void backToDetail();
			return;
		}
		mutate({ componentId: component.id, body });
	}

	return {
		form,
		handleSubmit,
		isPending,
		submitError: submitErrorMessage(error, m.components_edit_failed()),
	};
}
