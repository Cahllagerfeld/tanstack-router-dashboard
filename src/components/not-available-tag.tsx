import { Badge } from "./ui/badge";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Badge>;

export function NotAvailableTag({ variant = "secondary", ...props }: Props) {
	return (
		<Badge variant={variant} {...props}>
			Not available
		</Badge>
	);
}
