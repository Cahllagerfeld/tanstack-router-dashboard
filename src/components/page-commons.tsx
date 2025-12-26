import { cn } from "@/lib/utils";

export function PageContainer({
	className,
	...props
}: React.ComponentProps<"div">) {
	return <div className={cn("space-y-4", className)} {...props} />;
}

export function PageTitleHeading({
	className,
	...props
}: React.ComponentProps<"h1">) {
	return <h1 className={cn("text-2xl font-bold", className)} {...props} />;
}
export function PageTitleDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p className={cn("text-muted-foreground text-sm", className)} {...props} />
	);
}
