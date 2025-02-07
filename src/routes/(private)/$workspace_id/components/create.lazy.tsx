import { PageHeader } from "@/components/page-header";
import { FlavorConfig } from "@/features/components/create-component/flavor-config";
import {
	FlavorList,
	FlavorListSkeleton,
} from "@/features/components/create-component/flavor-list";
import { TypeList } from "@/features/components/create-component/type-list";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect, useState } from "react";

export const Route = createLazyFileRoute(
	"/(private)/$workspace_id/components/create"
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [selectedType, setSelectedType] = useState("");
	const [selectedFlavor, setSelectedFlavor] = useState("");

	useEffect(() => {
		console.log({ selectedFlavor, selectedType });
	}, [selectedFlavor, selectedType]);

	return (
		<div className="space-y-8">
			<PageHeader
				headline="Create Component"
				subHeadline="Use the form to register new Stack Components"
			/>
			{!selectedType && <TypeList setSelectedType={setSelectedType} />}
			{!!selectedType && !selectedFlavor && (
				<Suspense fallback={<FlavorListSkeleton />}>
					<FlavorList setFlavor={setSelectedFlavor} type={selectedType} />
				</Suspense>
			)}
			{!!selectedType && selectedFlavor && (
				<Suspense>
					<FlavorConfig flavorId={selectedFlavor} />
				</Suspense>
			)}
		</div>
	);
}
