export function getPageNumbers(totalPages: number, index: number) {
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
