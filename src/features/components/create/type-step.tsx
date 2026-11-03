import { Link } from "@tanstack/react-router";
import {
	Bell,
	Boxes,
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

import { m } from "@/paraglide/messages";

import { type ComponentType, getComponentTypeLabel } from "../type/model";
import { TYPE_DISPLAY_ORDER } from "./model";

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

const TYPE_BLURBS = {
	alerter: m.components_create_type_blurb_alerter,
	annotator: m.components_create_type_blurb_annotator,
	artifact_store: m.components_create_type_blurb_artifact_store,
	container_registry: m.components_create_type_blurb_container_registry,
	data_validator: m.components_create_type_blurb_data_validator,
	experiment_tracker: m.components_create_type_blurb_experiment_tracker,
	feature_store: m.components_create_type_blurb_feature_store,
	image_builder: m.components_create_type_blurb_image_builder,
	model_deployer: m.components_create_type_blurb_model_deployer,
	model_registry: m.components_create_type_blurb_model_registry,
	orchestrator: m.components_create_type_blurb_orchestrator,
	step_operator: m.components_create_type_blurb_step_operator,
	deployer: m.components_create_type_blurb_deployer,
	log_store: m.components_create_type_blurb_log_store,
	sandbox: m.components_create_type_blurb_sandbox,
} as const satisfies Record<ComponentType, () => string>;

/** Step 1: every Component type as a card linking to its Flavors. */
export function TypeStep() {
	return (
		<ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
			{TYPE_DISPLAY_ORDER.map((type) => {
				const Icon = TYPE_ICONS[type];
				return (
					<li key={type} className="flex">
						<Link
							to="/infra/components/create"
							search={{ type }}
							className="flex min-h-17 flex-1 items-start gap-3 rounded-lg border bg-card px-4 py-3 text-left transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50"
						>
							<Icon
								aria-hidden
								className="mt-0.5 size-4 shrink-0 text-muted-foreground"
							/>
							<span className="flex min-w-0 flex-col gap-0.5">
								<span className="text-sm font-medium">
									{getComponentTypeLabel(type)}
								</span>
								<span className="text-xs text-muted-foreground">
									{TYPE_BLURBS[type]()}
								</span>
							</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
