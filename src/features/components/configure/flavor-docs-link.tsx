import { ExternalLink } from "lucide-react";

import { m } from "@/paraglide/messages";

/** The Flavor's documentation, opened in a new tab. Renders nothing when the Flavor has none. */
export function FlavorDocsLink({ href }: { href: string | undefined }) {
	if (!href) return null;

	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
		>
			{m.components_configure_docs()}
			<ExternalLink aria-hidden className="size-3.5" />
		</a>
	);
}
