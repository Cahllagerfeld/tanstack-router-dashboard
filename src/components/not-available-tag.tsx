import { ComponentProps } from "react";
import { Badge } from "./ui/badge";

type Props = ComponentProps<typeof Badge>;

export function NotAvailableTag({ variant, ...props }: Props) {
	return (
		<Badge variant="secondary" {...props}>
			Not available
		</Badge>
	);
}
