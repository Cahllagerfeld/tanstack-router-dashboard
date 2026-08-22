import { CreateProjectDialogWithTrigger } from "../create/dialog/create-project-dialog";
import { NoItemFallback } from "@/components/no-item-fallback";
import { getEntityIcon } from "@/lib/constants/entity-icons";

export function ProjectListNoItemsFallback() {
	return (
		<NoItemFallback
			icon={getEntityIcon("project")}
			title="No projects found"
			subtitle="Create a new project to get started"
			cta={<CreateProjectDialogWithTrigger />}
		/>
	);
}
