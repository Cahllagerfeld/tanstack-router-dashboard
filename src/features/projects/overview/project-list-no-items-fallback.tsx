import { NoItemFallback } from "@/components/no-item-fallback";
import { getEntityIcon } from "@/lib/constants/entity-icons";
import { m } from "@/paraglide/messages";

import { CreateProjectDialogWithTrigger } from "../create/dialog/create-project-dialog";

export function ProjectListNoItemsFallback() {
	return (
		<NoItemFallback
			icon={getEntityIcon("project")}
			title={m.projects_empty_title()}
			subtitle={m.projects_empty_description()}
			cta={<CreateProjectDialogWithTrigger />}
		/>
	);
}
