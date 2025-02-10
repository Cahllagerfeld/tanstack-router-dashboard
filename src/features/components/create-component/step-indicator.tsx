import { CircleCheck } from "lucide-react";

type Props = {
	steps: string[];
	currentStep: number;
};

export function StepIndicator({ steps, currentStep }: Props) {
	return (
		<nav aria-label="Step indicator">
			<ol className="flex items-center gap-2">
				{steps.map((step, index) => (
					<li key={step}>
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
								{index + 1 < currentStep ? (
									<CircleCheck className="h-4 w-4 text-green-500" />
								) : (
									index + 1
								)}
							</div>
							{step}
						</div>
					</li>
				))}
			</ol>
		</nav>
	);
}
