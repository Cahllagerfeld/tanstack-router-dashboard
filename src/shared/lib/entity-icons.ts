import {
	Box,
	CirclePlay,
	Cpu,
	FileBox,
	FolderKanban,
	Layers,
	type LucideIcon,
	Rocket,
	Workflow,
} from "lucide-react";

export type EntityKind =
	| "project"
	| "component"
	| "stack"
	| "pipeline"
	| "run"
	| "model"
	| "artifact"
	| "deployment";

export const ENTITY_ICONS = {
	project: FolderKanban,
	component: Box,
	stack: Layers,
	pipeline: Workflow,
	run: CirclePlay,
	model: Cpu,
	artifact: FileBox,
	deployment: Rocket,
} as const satisfies Record<EntityKind, LucideIcon>;

export function getEntityIcon(kind: EntityKind): LucideIcon {
	return ENTITY_ICONS[kind];
}
