/**
 * Set the pagination data for the blog page.
 * @param page {number} page
 * @param totalItems {number} total number of articles
 * @param limit {number} limit of posts per page
 * @param baseUrl {string} base url
 * @param firstPage {string} first page
 * @returns  {PaginationData} the pagination data
 */
export function buildPaginationData(
	page: number,
	totalItems: number,
	limit = 11,
	baseUrl: string,
	firstPage?: string
): PaginationData {
	// total number of pages
	const tempTotalItems: number = totalItems;
	const totalPages = Math.ceil(tempTotalItems / limit);

	// current page and the previous and next page
	const currentPage: number = page;
	const prevPage: number = currentPage > 1 ? currentPage - 1 : null;
	const nextPage: number = currentPage < totalPages ? currentPage + 1 : null;

	// first page: curentPage = 2 ? index : curentPage - 1
	const tempFirstPage = firstPage ? firstPage : `${baseUrl}/${1}`;
	// last page: totalPages
	const lastPage = `${baseUrl}/${totalPages}`;

	const paginationData: PaginationData = {
		totalPages,
		currentPage,
		prevPage,
		nextPage,
		totalItems: tempTotalItems,
		firstPage: tempFirstPage,
		lastPage,
		baseUrl
	};

	return paginationData;
}
