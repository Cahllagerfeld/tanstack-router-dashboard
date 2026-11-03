import { Link } from "@tanstack/react-router";
import {
	Bell,
	Boxes,
	ChevronRight,
	CloudUpload,
	Container,
	FlaskConical,
	Hammer,
	HardDrive,
	Library,
	type LucideIcon,
	Network,
	Rocket,
	ScrollText,
	Server,
	ShieldCheck,
	Table2,
	Tag,
} from "lucide-react";
import { useId } from "react";

import { m } from "@/paraglide/messages";

import {
	COMPONENT_TYPES,
	type ComponentType,
	getComponentTypeLabel,
} from "../type/model";

const TYPE_ICONS = {
	alerter: Bell,
	annotator: Tag,
	artifact_store: HardDrive,
	container_registry: Container,
	data_validator: ShieldCheck,
	experiment_tracker: FlaskConical,
	feature_store: Table2,
	image_builder: Hammer,
	model_deployer: CloudUpload,
	model_registry: Library,
	orchestrator: Network,
	step_operator: Server,
	deployer: Rocket,
	log_store: ScrollText,
	sandbox: Boxes,
} as const satisfies Record<ComponentType, LucideIcon>;

/** Step 1: every Component type as a link to its Flavors. */
export function TypeStep() {
	const headingId = useId();

	return (
		<section className="flex flex-col gap-3" aria-labelledby={headingId}>
			<h2 id={headingId} className="text-base font-medium">
				{m.components_create_type_heading()}
			</h2>
			<ul className="flex flex-col divide-y rounded-lg border">
				{COMPONENT_TYPES.map((type) => {
					const Icon = TYPE_ICONS[type];
					return (
						<li key={type}>
							<Link
								to="/infra/components/create"
								search={{ type }}
								className="flex items-center gap-3 px-3 py-3 transition-colors outline-none hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50"
							>
								<span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
									<Icon aria-hidden className="size-4" />
								</span>
								<span className="flex-1 text-sm font-medium">
									{getComponentTypeLabel(type)}
								</span>
								<ChevronRight
									aria-hidden
									className="size-4 text-muted-foreground"
								/>
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
