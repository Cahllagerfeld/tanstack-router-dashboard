import { ComponentProps } from "react";
import { Badge } from "./ui/badge";

type Props = ComponentProps<typeof Badge>;

export function NotAvailableTag({ variant = "secondary", ...props }: Props) {
	return (
		<Badge variant={variant} {...props}>
			Not available
		</Badge>
	);
}
