import { type LinkComponent, createLink } from "@tanstack/react-router";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";

import { m } from "@/paraglide/messages";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			role="navigation"
			aria-label={m.common_pagination_label()}
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
			aria-label={m.common_pagination_previous_label()}
			size="default"
			className={cn("gap-1 px-2.5 sm:pl-2.5", props.className)}
			{...props}
		>
			<ChevronLeftIcon />
			<span className="hidden sm:block">
				{m.common_pagination_previous_text()}
			</span>
		</PaginationLink>
	);
};

const PaginationFirst: PaginationLinkProps = (props) => {
	return (
		<PaginationLink
			aria-label={m.common_pagination_first_label()}
			size="default"
			className={cn("gap-1 pl-2.5", props.className)}
			{...props}
		>
			<ChevronsLeft />
			<span>{m.common_pagination_first_text()}</span>
		</PaginationLink>
	);
};

const PaginationNext: PaginationLinkProps = (props) => {
	return (
		<PaginationLink
			aria-label={m.common_pagination_next_label()}
			size="default"
			className={cn("gap-1 px-2.5 sm:pr-2.5", props.className)}
			{...props}
		>
			<span className="hidden sm:block">{m.common_pagination_next_text()}</span>
			<ChevronRightIcon />
		</PaginationLink>
	);
};

const PaginationLast: PaginationLinkProps = (props) => {
	return (
		<PaginationLink
			aria-label={m.common_pagination_last_label()}
			size="default"
			className={cn("gap-1 pl-2.5", props.className)}
			{...props}
		>
			<span>{m.common_pagination_last_text()}</span>
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
			<span className="sr-only">{m.common_pagination_more()}</span>
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
