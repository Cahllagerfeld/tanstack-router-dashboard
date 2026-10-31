import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	/** Names the page for assistive tech; list pages have no visible heading. */
	title?: string;
}>;

export function TableView({ title, children }: Props) {
	return (
		<div className="flex min-w-0 flex-col">
			{title ? <h1 className="sr-only">{title}</h1> : null}
			{children}
		</div>
	);
}
