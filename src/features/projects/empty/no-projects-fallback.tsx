import { getEntityIcon } from "@/lib/constants/entity-icons";
import { m } from "@/paraglide/messages";
import { ContentInset } from "@/shared/components/content-inset";
import { NoItemFallback } from "@/shared/components/no-item-fallback";

import { CreateProjectDialogWithTrigger } from "../create/create-project-dialog";

export function NoProjectsFallback() {
	return (
		<ContentInset>
			<NoItemFallback
				icon={getEntityIcon("project")}
				title={m.projects_empty_title()}
				subtitle={m.projects_empty_description()}
				cta={<CreateProjectDialogWithTrigger />}
			/>
		</ContentInset>
	);
}
