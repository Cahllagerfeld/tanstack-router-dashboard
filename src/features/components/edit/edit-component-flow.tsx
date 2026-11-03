import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { FileWarning } from "lucide-react";
import { useId } from "react";
import { useFormState } from "react-hook-form";

import { m } from "@/paraglide/messages";
import { Button, buttonVariants } from "@/shared/ui/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/shared/ui/empty";

import { ComponentConfigureForm } from "../configure/component-configure-form";
import { ComponentFlowLayout } from "../configure/component-flow-layout";
import { componentQueries } from "../data/queries";
import type { Component } from "../model";
import { useEditComponentForm } from "./use-edit-component-form";

/** Edits a Component's name and configuration. Its type and Flavor are locked, because the backend cannot change them. */
export function EditComponentFlow({ componentId }: { componentId: string }) {
	const { data: component } = useSuspenseQuery(
		componentQueries.detail(componentId)
	);

	if (!hasFlavor(component)) return <MissingFlavor component={component} />;
	return <EditComponentForm component={component} />;
}

type ComponentWithFlavor = Component & {
	flavor: NonNullable<Component["flavor"]>;
};

function hasFlavor(component: Component): component is ComponentWithFlavor {
	return component.flavor !== undefined;
}

function EditComponentForm({ component }: { component: ComponentWithFlavor }) {
	const id = useId();
	const { data: flavor } = useSuspenseQuery(
		componentQueries.flavorDetail(component.flavor.id)
	);
	const { form, handleSubmit, isPending, submitError } = useEditComponentForm({
		component,
		flavor,
	});
	const { isDirty } = useFormState({ control: form.control });

	return (
		<ComponentFlowLayout
			title={m.components_edit_title({ name: component.name })}
			footer={
				<>
					<CancelLink componentId={component.id} />
					<Button type="submit" form={id} disabled={!isDirty || isPending}>
						{m.components_edit_save()}
					</Button>
				</>
			}
		>
			<ComponentConfigureForm
				id={id}
				form={form}
				flavor={flavor}
				onSubmit={handleSubmit}
				submitError={submitError}
				disabled={isPending}
			/>
		</ComponentFlowLayout>
	);
}

function MissingFlavor({ component }: { component: Component }) {
	return (
		<ComponentFlowLayout
			title={m.components_edit_title({ name: component.name })}
			footer={<CancelLink componentId={component.id} />}
		>
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<FileWarning />
					</EmptyMedia>
					<EmptyTitle>{m.components_edit_flavor_missing_title()}</EmptyTitle>
					<EmptyDescription>
						{m.components_edit_flavor_missing_description()}
					</EmptyDescription>
				</EmptyHeader>
			</Empty>
		</ComponentFlowLayout>
	);
}

function CancelLink({ componentId }: { componentId: string }) {
	return (
		<Link
			to="/infra/components/$component_id"
			params={{ component_id: componentId }}
			className={buttonVariants({ variant: "outline" })}
		>
			{m.common_action_cancel()}
		</Link>
	);
}
