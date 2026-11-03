import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { m } from "@/paraglide/messages";
import { cn } from "@/shared/lib/cn";

export type FlowStep = {
	label: string;
	state: "done" | "current" | "upcoming";
};

type ComponentFlowLayoutProps = {
	title: string;
	/** Step indicator, as in the prototype's Type → Flavor → Configure. Omit for a single-step flow such as edit. */
	steps?: FlowStep[];
	children: ReactNode;
	/** Sticky action row: Back/Cancel on the left, the primary action on the right. */
	footer: ReactNode;
};

/** Full-page flow shell shared by creating and editing a Component: a centered column with a footer action row. */
export function ComponentFlowLayout({
	title,
	steps,
	children,
	footer,
}: ComponentFlowLayoutProps) {
	return (
		<div className="flex flex-1 flex-col">
			<div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-6">
				<header className="flex flex-col gap-4">
					<h1 className="text-lg font-semibold">{title}</h1>
					{steps && steps.length > 0 ? <FlowSteps steps={steps} /> : null}
				</header>
				{children}
			</div>
			<footer className="sticky bottom-0 z-10 border-t bg-background">
				<div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2 px-4 py-3">
					{footer}
				</div>
			</footer>
		</div>
	);
}

function FlowSteps({ steps }: { steps: FlowStep[] }) {
	return (
		<nav aria-label={m.components_flow_steps_label()}>
			<ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
				{steps.map((step, index) => (
					<li
						key={step.label}
						aria-current={step.state === "current" ? "step" : undefined}
						className={cn(
							"flex items-center gap-2",
							step.state === "upcoming"
								? "text-muted-foreground"
								: "text-foreground",
							step.state === "current" && "font-medium"
						)}
					>
						{index > 0 ? (
							<span aria-hidden className="h-px w-6 bg-border" />
						) : null}
						<span
							aria-hidden
							className={cn(
								"flex size-5 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums",
								step.state === "current" &&
									"border-primary bg-primary text-primary-foreground",
								step.state === "done" && "border-primary text-primary"
							)}
						>
							{step.state === "done" ? <Check className="size-3" /> : index + 1}
						</span>
						<span>
							{step.label}
							{step.state === "done" ? (
								<span className="sr-only">
									{" "}
									{m.components_flow_step_done()}
								</span>
							) : null}
						</span>
					</li>
				))}
			</ol>
		</nav>
	);
}
