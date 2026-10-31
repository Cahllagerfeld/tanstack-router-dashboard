import type { PropsWithChildren } from "react";

import { Card, CardContent } from "@/shared/ui/card";

type Props = PropsWithChildren<{
	title: string;
	description: string;
}>;

/** A titled group of settings: its scope on the left, its controls in a card on the right. */
export function SettingsSection({ title, description, children }: Props) {
	return (
		<section className="grid gap-4 px-4 py-8 not-last:border-b md:grid-cols-[16rem_minmax(0,42rem)] md:gap-12">
			<div>
				<h2 className="text-sm font-medium">{title}</h2>
				<p className="mt-1 text-sm text-muted-foreground">{description}</p>
			</div>
			<Card>
				<CardContent className="flex flex-col gap-4">{children}</CardContent>
			</Card>
		</section>
	);
}
