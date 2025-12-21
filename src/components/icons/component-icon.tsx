import {
	type LucideIcon,
	type LucideProps,
	Workflow,
	Database,
	Container,
	Wrench,
	FlaskConical,
	Image as ImageIcon,
	Bell,
	Pencil,
	ShieldCheck,
	Layers,
	Rocket,
	BookOpen,
} from "lucide-react";
import type { ComponentType } from "@/types/components";

const COMPONENT_TYPE_TO_ICON: Record<ComponentType, LucideIcon> = {
	orchestrator: Workflow,
	artifact_store: Database,
	container_registry: Container,
	step_operator: Wrench,
	experiment_tracker: FlaskConical,
	image_builder: ImageIcon,
	alerter: Bell,
	annotator: Pencil,
	data_validator: ShieldCheck,
	feature_store: Layers,
	model_deployer: Rocket,
	model_registry: BookOpen,
	deployer: Rocket,
} as const;

export interface ComponentIconProps extends LucideProps {
	type: ComponentType;
}

export function ComponentIcon({ type, ...props }: ComponentIconProps) {
	const Icon = COMPONENT_TYPE_TO_ICON[type];
	return <Icon {...props} />;
}
