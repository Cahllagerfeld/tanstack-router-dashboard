import {
	PaginationContent,
	PaginationEllipsis,
	PaginationFirst,
	PaginationItem,
	PaginationLast,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as PaginationPrimitive,
} from "@/components/ui/pagination";
import { getPageNumbers } from "./page-numbers";

type Props = {
	index: number;
	totalPages: number;
};

export function Pagination({ index, totalPages }: Props) {
	if (totalPages <= 1) return null;

	const pageNumbers = getPageNumbers(totalPages, index);

	return (
		<PaginationPrimitive>
			<PaginationContent>
				{index > 1 && (
					<PaginationItem>
						<PaginationFirst
							to="."
							search={(prev: any) => ({ ...prev, page: 1 })}
						/>
					</PaginationItem>
				)}

				{index > 1 && (
					<PaginationItem>
						<PaginationPrevious
							to="."
							search={(prev: any) => ({ ...prev, page: index - 1 })}
						/>
					</PaginationItem>
				)}

				{!pageNumbers.includes(1) && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{pageNumbers.map((page, idx) => (
					<PaginationItem key={idx}>
						<PaginationLink
							to="."
							search={(prev: any) => ({ ...prev, page })}
							isActive={page === index}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				{!pageNumbers.includes(totalPages) && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{index < totalPages && (
					<PaginationItem>
						<PaginationNext
							to="."
							search={(prev: any) => ({ ...prev, page: index + 1 })}
						/>
					</PaginationItem>
				)}

				{index < totalPages && (
					<PaginationItem>
						<PaginationLast
							to="."
							search={(prev: any) => ({ ...prev, page: totalPages })}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</PaginationPrimitive>
	);
}
