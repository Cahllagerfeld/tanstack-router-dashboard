import { NoItemFallback } from "@/components/no-item-fallback";
import { Frame } from "lucide-react";
import { CreateProjectDialogWithTrigger } from "../create/dialog/create-project-dialog";
export function ProjectListNoItemsFallback() {
	return (
		<NoItemFallback
			icon={Frame}
			title="No projects found"
			subtitle="Create a new project to get started"
			cta={<CreateProjectDialogWithTrigger />}
		/>
	);
}
