import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createLink, LinkComponent } from "@tanstack/react-router";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex flex-row items-center gap-1", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type BasicPaginationLinkProps = {
	isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function BasicPaginationLink({
	className,
	isActive,
	size = "icon",
	...props
}: BasicPaginationLinkProps) {
	return (
		<a
			aria-current={isActive ? "page" : undefined}
			data-slot="pagination-link"
			data-active={isActive}
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
}

const PaginationPrevious: PaginationLinkProps = (props) => {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("gap-1 px-2.5 sm:pl-2.5", props.className)}
			{...props}
		>
			<ChevronLeftIcon />
			<span className="hidden sm:block">Previous</span>
		</PaginationLink>
	);
};

const PaginationFirst: PaginationLinkProps = (props) => {
	return (
		<PaginationLink
			aria-label="Go to first page"
			size="default"
			className={cn("gap-1 pl-2.5", props.className)}
			{...props}
		>
			<ChevronsLeft />
			<span>First</span>
		</PaginationLink>
	);
};

const PaginationNext: PaginationLinkProps = (props) => {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("gap-1 px-2.5 sm:pr-2.5", props.className)}
			{...props}
		>
			<span className="hidden sm:block">Next</span>
			<ChevronRightIcon />
		</PaginationLink>
	);
};

const PaginationLast: PaginationLinkProps = (props) => {
	return (
		<PaginationLink
			aria-label="Go to last page"
			size="default"
			className={cn("gap-1 pl-2.5", props.className)}
			{...props}
		>
			<span>Last</span>
			<ChevronsRight />
		</PaginationLink>
	);
};

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn("flex size-9 items-center justify-center", className)}
			{...props}
		>
			<MoreHorizontalIcon className="size-4" />
			<span className="sr-only">More pages</span>
		</span>
	);
}

const PaginationLinkComponent = createLink(BasicPaginationLink);

type PaginationLinkProps = LinkComponent<typeof PaginationLinkComponent>;

const PaginationLink: PaginationLinkProps = (props) => {
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
