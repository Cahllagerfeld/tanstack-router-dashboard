import { Link } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";

import { m } from "@/paraglide/messages";
import { cn } from "@/shared/lib/cn";

import type { ComponentType } from "../type/model";
import type { StepState } from "./model";

export type SidebarStep = {
	label: string;
	state: StepState;
	/** The create search that reopens this step. Only done steps link back. */
	search: { type?: ComponentType };
};

const rowClass = "flex h-8 items-center gap-2 rounded-md px-2 text-sm";

/** The create flow's steps, kept in view on the left: done steps link back, the current one is marked. */
export function CreateStepsSidebar({
	title,
	steps,
}: {
	title: string;
	steps: SidebarStep[];
}) {
	return (
		<nav
			aria-label={m.components_flow_steps_label()}
			className="hidden w-58 shrink-0 border-r bg-secondary md:block"
		>
			<div className="sticky top-0 flex flex-col gap-0.5 px-3 pt-6 pb-4">
				<div className="mb-2 flex items-center gap-2.5 border-b pb-4">
					<span className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-card">
						<Plus aria-hidden className="size-4.5" />
					</span>
					<span className="truncate font-medium tracking-tight">{title}</span>
				</div>
				<ol className="flex flex-col gap-0.5">
					{steps.map((step, index) => (
						<li key={step.label}>
							<StepRow step={step} number={index + 1} />
						</li>
					))}
				</ol>
			</div>
		</nav>
	);
}

function StepRow({ step, number }: { step: SidebarStep; number: number }) {
	const content = (
		<>
			<StepMarker state={step.state} number={number} />
			<span className="truncate">
				{step.label}
				{step.state === "done" ? (
					<span className="sr-only"> {m.components_flow_step_done()}</span>
				) : null}
			</span>
		</>
	);

	if (step.state === "done")
		return (
			<Link
				to="/infra/components/create"
				search={step.search}
				className={cn(
					rowClass,
					"text-foreground/75 transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
				)}
			>
				{content}
			</Link>
		);

	return (
		<div
			aria-current={step.state === "current" ? "step" : undefined}
			className={cn(
				rowClass,
				step.state === "current"
					? "bg-primary/10 font-medium text-primary"
					: "text-muted-foreground"
			)}
		>
			{content}
		</div>
	);
}

function StepMarker({ state, number }: { state: StepState; number: number }) {
	if (state === "done")
		return <Check aria-hidden className="size-4 shrink-0 text-primary" />;

	return (
		<span
			aria-hidden
			className={cn(
				"flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] tabular-nums",
				state === "current"
					? "bg-primary font-semibold text-primary-foreground"
					: "border text-muted-foreground"
			)}
		>
			{number}
		</span>
	);
}
