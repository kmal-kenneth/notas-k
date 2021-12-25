/**
 * Set the pagination data for the blog page.
 * @param page {number} page
 * @param totalItems {number} total number of articles
 * @param totalPages {number} total number of pages
 * @param pageSize {number} number of articles per page
 * @param baseUrl {string} base url
 * @param firstPage {string} first page
 * @returns  {PaginationData} the pagination data
 */
export function buildPaginationData(
	page: number,
	totalItems: number,
	totalPages: number,
	pageSize: number,
	baseUrl: string,
	firstPage?: string
): PaginationData {
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
		totalItems: totalItems,
		firstPage: tempFirstPage,
		lastPage,
		baseUrl,
		pageSize
	};

	return paginationData;
}
