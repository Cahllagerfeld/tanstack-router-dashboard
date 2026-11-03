import { Suspense, lazy, useEffect } from "react";

import { m } from "@/paraglide/messages";
import { Skeleton } from "@/shared/ui/skeleton";

import { type ComponentType, getComponentTypeLabel } from "../type/model";
import {
	BackLink,
	CancelLink,
	CreateLayout,
	NextButton,
} from "./create-layout";
import { FlavorStep } from "./flavor-step";
import { createStepFor } from "./model";
import { TypeStep } from "./type-step";

/** The Configure step's chunk carries the schema form and Ajv, so the Type and Flavor steps skip it. */
const loadConfigureStep = () => import("./configure-step");

const ConfigureStep = lazy(() =>
	loadConfigureStep().then(({ ConfigureStep }) => ({ default: ConfigureStep }))
);

type CreateComponentFlowProps = {
	type: ComponentType | undefined;
	/** A Flavor of `type` that exists; anything else shows the Flavor step. */
	flavorId: string | undefined;
};

/** Creates a Component in three URL-addressed steps: pick a type, pick a Flavor, configure it. */
export function CreateComponentFlow({
	type,
	flavorId,
}: CreateComponentFlowProps) {
	const step = createStepFor({ type, flavorId });

	// Warm the Configure chunk while the user picks a Flavor.
	useEffect(() => {
		if (step === "flavor") void loadConfigureStep();
	}, [step]);

	if (type && flavorId)
		return (
			<Suspense fallback={<ConfigureStepSkeleton type={type} />}>
				<ConfigureStep key={flavorId} type={type} flavorId={flavorId} />
			</Suspense>
		);

	if (type)
		return (
			<CreateLayout
				step="flavor"
				type={type}
				title={m.components_create_flavor_heading({
					type: getComponentTypeLabel(type).toLowerCase(),
				})}
				footer={
					<>
						<BackLink search={{}} />
						<NextButton />
					</>
				}
			>
				<FlavorStep type={type} />
			</CreateLayout>
		);

	return (
		<CreateLayout
			step="type"
			title={m.components_create_type_heading()}
			footer={
				<>
					<CancelLink />
					<NextButton />
				</>
			}
		>
			<TypeStep />
		</CreateLayout>
	);
}

function ConfigureStepSkeleton({ type }: { type: ComponentType }) {
	return (
		<CreateLayout
			step="configure"
			type={type}
			title={m.components_create_step_configure()}
			footer={<BackLink search={{ type }} />}
		>
			<div className="flex flex-col gap-4">
				<Skeleton className="h-9 w-full" />
				<Skeleton className="h-9 w-full" />
				<Skeleton className="h-9 w-2/3" />
			</div>
		</CreateLayout>
	);
}
