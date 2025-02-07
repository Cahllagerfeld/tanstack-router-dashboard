import { ReactNode } from "react";

type Props = {
	headline: ReactNode;
	subHeadline: ReactNode;
};

export function PageHeader({ headline, subHeadline }: Props) {
	return (
		<div>
			<h1 className="text-2xl font-bold">{headline}</h1>
			<p className="text-sm text-muted-foreground">{subHeadline}</p>
		</div>
	);
}
