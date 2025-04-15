import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createLink, LinkComponent } from "@tanstack/react-router";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontal,
} from "lucide-react";
import * as React from "react";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn("mx-auto flex w-full justify-center", className)}
		{...props}
	/>
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn("flex flex-row items-center gap-1", className)}
		{...props}
	/>
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

const PaginationPrevious: LinkComponent<typeof PaginationLinkComponent> = (
	props
) => (
	<PaginationLink
		aria-label="Go to previous page"
		size="default"
		className={cn("gap-1 pl-2.5", props.className)}
		{...props}
	>
		<ChevronLeft className="h-4 w-4" />
		<span>Previous</span>
	</PaginationLink>
);

const PaginationNext: LinkComponent<typeof PaginationLinkComponent> = (
	props
) => (
	<PaginationLink
		aria-label="Go to next page"
		size="default"
		className={cn("gap-1 pr-2.5", props.className)}
		{...props}
	>
		<span>Next</span>
		<ChevronRight className="h-4 w-4" />
	</PaginationLink>
);

const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		aria-hidden
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">More pages</span>
	</span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const PaginationLast: LinkComponent<typeof PaginationLinkComponent> = (
	props
) => (
	<PaginationLink
		aria-label="Go to last page"
		size="default"
		className={cn("gap-1 pl-2.5", props.className)}
		{...props}
	>
		<span>Last</span>
		<ChevronsRight className="h-4 w-4" />
	</PaginationLink>
);

const PaginationFirst: LinkComponent<typeof PaginationLinkComponent> = (
	props
) => (
	<PaginationLink
		aria-label="Go to first page"
		size="default"
		className={cn("gap-1 pl-2.5", props.className)}
		{...props}
	>
		<ChevronsLeft className="h-4 w-4" />
		<span>First</span>
	</PaginationLink>
);

type BasicPaginationLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
	Pick<ButtonProps, "size"> & {
		isActive?: boolean;
	};

const BasicPaginationLink = React.forwardRef<
	HTMLAnchorElement,
	BasicPaginationLinkProps
>(({ isActive, size, className, ...props }, ref) => {
	return (
		<a
			ref={ref}
			aria-current={isActive ? "page" : undefined}
			className={cn(
				buttonVariants({
					variant: isActive ? "outline" : "ghost",
					size,
				}),
				className
			)}
			{...props}
		/>
	);
});
BasicPaginationLink.displayName = "BasicPaginationLink";

const PaginationLinkComponent = createLink(BasicPaginationLink);

const PaginationLink: LinkComponent<typeof PaginationLinkComponent> = (
	props
) => {
	return <PaginationLinkComponent {...props} />;
};

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationFirst,
	PaginationItem,
	PaginationLast,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
