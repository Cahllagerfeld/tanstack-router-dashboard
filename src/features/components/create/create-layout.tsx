import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { m } from "@/paraglide/messages";
import { Button, buttonVariants } from "@/shared/ui/button";

import { ComponentFlowLayout } from "../configure/component-flow-layout";
import type { ComponentType } from "../type/model";
import { CreateStepsSidebar, type SidebarStep } from "./create-steps-sidebar";
import { type CreateStep, createStepStates } from "./model";

/** The create flow's page shell: the steps sidebar with `step` current, and the step's content and footer. */
export function CreateLayout({
	step,
	type,
	title,
	titleAside,
	footer,
	children,
}: {
	step: CreateStep;
	/** The chosen type, so the done Flavor step can link back to it. */
	type?: ComponentType;
	title: string;
	titleAside?: ReactNode;
	footer: ReactNode;
	children: ReactNode;
}) {
	const labels: Record<CreateStep, string> = {
		type: m.components_create_step_type(),
		flavor: m.components_create_step_flavor(),
		configure: m.components_create_step_configure(),
	};
	const searches: Record<CreateStep, SidebarStep["search"]> = {
		type: {},
		flavor: { type },
		configure: { type },
	};
	const states = createStepStates(step);
	const steps: SidebarStep[] = states.map(({ step: key, state }) => ({
		label: labels[key],
		state,
		search: searches[key],
	}));

	return (
		<ComponentFlowLayout
			sidebar={
				<CreateStepsSidebar title={m.components_create_title()} steps={steps} />
			}
			width={step}
			title={title}
			titleAside={titleAside}
			progress={m.components_flow_step_progress({
				current: states.findIndex(({ state }) => state === "current") + 1,
				total: states.length,
				step: labels[step],
			})}
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
			className={buttonVariants({
				variant: "ghost",
				className: "-ml-3 gap-1.5 px-3",
			})}
		>
			<ArrowLeft aria-hidden />
			{m.common_action_back()}
		</Link>
	);
}

/** Leaves the create flow for the Component list. */
export function CancelLink() {
	return (
		<Link
			to="/infra/components"
			className={buttonVariants({ variant: "secondary" })}
		>
			{m.common_action_cancel()}
		</Link>
	);
}

/** The picking steps advance by choosing a tile, so their Next stays disabled, as in the design. */
export function NextButton() {
	return (
		<Button type="button" disabled>
			{m.common_action_next()}
		</Button>
	);
}
