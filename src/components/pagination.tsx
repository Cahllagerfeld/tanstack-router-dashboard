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
} from "./ui/pagination";

type Props = {
	index: number;
	totalPages: number;
};

export function Pagination({ index, totalPages }: Props) {
	if (totalPages <= 1) return null;

	function getPageNumbers() {
		const pageNumbers = [];

		if (totalPages <= 3) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			// Push current page
			pageNumbers.push(index);

			if (index > 1) {
				pageNumbers.unshift(index - 1);
			}

			if (index < totalPages) {
				pageNumbers.push(index + 1);
			}

			if (pageNumbers.length < 3) {
				if (index === 1) {
					pageNumbers.push(index + 2);
				} else if (index === totalPages) {
					pageNumbers.unshift(index - 2);
				}
			}
		}
		return pageNumbers;
	}

	const pageNumbers = getPageNumbers();

	return (
		<PaginationPrimitive>
			<PaginationContent>
				{index > 1 && (
					<PaginationItem>
						<PaginationFirst to="." search={(prev) => ({ ...prev, page: 1 })} />
					</PaginationItem>
				)}

				{index > 1 && (
					<PaginationItem>
						<PaginationPrevious
							to="."
							search={(prev) => ({ ...prev, page: index - 1 })}
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
							search={(prev) => ({ ...prev, page })}
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
							search={(prev) => ({ ...prev, page: index + 1 })}
						/>
					</PaginationItem>
				)}

				{index < totalPages && (
					<PaginationItem>
						<PaginationLast
							to="."
							search={(prev) => ({ ...prev, page: totalPages })}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</PaginationPrimitive>
	);
}
