import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { m } from "@/paraglide/messages";
import { buttonVariants } from "@/shared/ui/button";

import {
	ComponentFlowLayout,
	type FlowStep,
} from "../configure/component-flow-layout";
import type { ComponentType } from "../type/model";
import { type CreateStep, createStepStates } from "./model";

/** The create flow's page shell, with its Type → Flavor → Configure indicator at `step`. */
export function CreateLayout({
	step,
	footer,
	children,
}: {
	step: CreateStep;
	footer: ReactNode;
	children: ReactNode;
}) {
	const labels: Record<CreateStep, string> = {
		type: m.components_create_step_type(),
		flavor: m.components_create_step_flavor(),
		configure: m.components_create_step_configure(),
	};
	const steps: FlowStep[] = createStepStates(step).map(
		({ step: key, state }) => ({ label: labels[key], state })
	);

	return (
		<ComponentFlowLayout
			title={m.components_create_title()}
			steps={steps}
			footer={footer}
		>
			{children}
		</ComponentFlowLayout>
	);
}

/** Returns to the create step that `search` addresses. */
export function BackLink({ search }: { search: { type?: ComponentType } }) {
	return (
		<Link
			to="/infra/components/create"
			search={search}
			className={buttonVariants({ variant: "outline" })}
		>
			{m.common_action_back()}
		</Link>
	);
}
