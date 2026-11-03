import { useSuspenseQuery } from "@tanstack/react-query";
import { useId } from "react";

import { m } from "@/paraglide/messages";
import { Button } from "@/shared/ui/button";

import { ComponentConfigureForm } from "../configure/component-configure-form";
import { FlavorDocsLink } from "../configure/flavor-docs-link";
import { componentQueries } from "../data/queries";
import { type ComponentType, getComponentTypeLabel } from "../type/model";
import { BackLink, CreateLayout } from "./create-layout";
import { useCreateComponentForm } from "./use-create-component-form";

/**
 * The Configure step for a Flavor of `type`. It pulls in the schema form and its validator,
 * so the create flow loads it lazily. Mount it under a key per Flavor.
 */
export function ConfigureStep({
	type,
	flavorId,
}: {
	type: ComponentType;
	flavorId: string;
}) {
	const id = useId();
	const { data: flavor } = useSuspenseQuery(
		componentQueries.flavorDetail(flavorId)
	);
	const { form, handleCreate, isPending, submitError } = useCreateComponentForm(
		{ type, flavor }
	);
	const typeLabel = getComponentTypeLabel(type).toLowerCase();

	return (
		<CreateLayout
			step="configure"
			type={type}
			title={m.components_create_configure_heading({
				flavor: flavor.displayName,
				type: typeLabel,
			})}
			titleAside={<FlavorDocsLink href={flavor.docsUrl} />}
			footer={
				<>
					<BackLink search={{ type }} />
					<Button type="submit" form={id} disabled={isPending}>
						{isPending
							? m.components_create_pending()
							: m.components_create_submit({ type: typeLabel })}
					</Button>
				</>
			}
		>
			<ComponentConfigureForm
				id={id}
				form={form}
				flavor={flavor}
				onSubmit={handleCreate}
				submitError={submitError}
				disabled={isPending}
			/>
		</CreateLayout>
	);
}
