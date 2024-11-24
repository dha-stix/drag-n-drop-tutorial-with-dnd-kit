import { useState, useEffect } from "react";

/**
 * Custom hook for paginating data with special handling of the last few items
 * @param data - The array of items to paginate
 */
export default function usePagination<T>(data: T[]) {
	const PAGE_SIZE = 4; // Maximum items per batch
	const [currentPage, setCurrentPage] = useState(0);

	// Calculate the total number of pages
	const totalPages = Math.ceil(data.length / PAGE_SIZE);

	// Ensure currentPage is within bounds when data changes
	useEffect(() => {
		if (currentPage >= totalPages) {
			setCurrentPage(totalPages > 0 ? totalPages - 1 : 0);
		}
	}, [data, totalPages, currentPage]);

	// Calculate paginated data dynamically
	const paginatedData = (() => {
		// Handle the last page displaying fewer items
		const startIndex = currentPage * PAGE_SIZE;
		const endIndex = Math.min(startIndex + PAGE_SIZE, data.length);
		return data.slice(startIndex, endIndex);
	})();

	/**
	 * Handles "Show More" logic to paginate or reset
	 */
	const handleShowMore = () => {
		// Reset if we're at the very last page
		if (currentPage === totalPages - 1) {
			setCurrentPage(0);
		} else {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	return {
		paginatedData,
		handleShowMore,
		currentPage,
		isEnd: currentPage === totalPages - 1,
	};
}