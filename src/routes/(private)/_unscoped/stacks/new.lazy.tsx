import {
	PageContainer,
	PageTitleDescription,
	PageTitleHeading,
} from "@/components/page-commons";
import { CreateStackGeneralCard } from "@/features/stacks/create/general-card";
import { ComponentTypeGrid } from "@/features/stacks/create/component-type-grid";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(private)/_unscoped/stacks/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<PageContainer>
			<div>
				<PageTitleHeading>Create Stack</PageTitleHeading>
				<PageTitleDescription>
					Create a new stack by providing a name and description.
				</PageTitleDescription>
			</div>

			<CreateStackGeneralCard />

			<ComponentTypeGrid />
		</PageContainer>
	);
}
