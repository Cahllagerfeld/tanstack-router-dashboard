import { PageHeader } from "@/components/page-header";
import { FlavorConfig } from "@/features/components/create-component/flavor-config";
import {
	FlavorList,
	FlavorListSkeleton,
} from "@/features/components/create-component/flavor-list";
import { StepIndicator } from "@/features/components/create-component/step-indicator";
import { TypeList } from "@/features/components/create-component/type-list";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";

export const Route = createLazyFileRoute(
	"/(private)/$workspace_id/components/create"
)({
	component: RouteComponent,
});

const steps = ["Component Type", "Flavor", "Configuration"];

function RouteComponent() {
	const [currentStep, setCurrentStep] = useState(1);
	const [selectedType, setSelectedType] = useState("");
	const [selectedFlavor, setSelectedFlavor] = useState("");

	function goToNextStep() {
		setCurrentStep((prev) => prev + 1);
	}

	return (
		<div className="space-y-8">
			<PageHeader
				headline="Create Component"
				subHeadline="Use the form to register new Stack Components"
			/>
			<StepIndicator steps={steps} currentStep={currentStep} />
			{!selectedType && (
				<TypeList
					setSelectedType={(string) => {
						setSelectedType(string);
						goToNextStep();
					}}
				/>
			)}
			{!!selectedType && !selectedFlavor && (
				<Suspense fallback={<FlavorListSkeleton />}>
					<FlavorList
						setFlavor={(string) => {
							setSelectedFlavor(string);
							goToNextStep();
						}}
						type={selectedType}
					/>
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
