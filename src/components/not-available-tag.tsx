import { Badge } from "./ui/badge";
import { m } from "@/paraglide/messages";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Badge>;

export function NotAvailableTag({ variant = "secondary", ...props }: Props) {
	return (
		<Badge variant={variant} {...props}>
			{m.common_status_not_available()}
		</Badge>
	);
}
