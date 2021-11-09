import type { EndpointOutput } from '@sveltejs/kit';
import { strapiURL } from '$lib/env';

// Query: the articles of a specific page
const query = `query ArticlePage($start: Int, $limit: Int) {
	articles(start: $start, limit: $limit, sort: "published_at:DESC") {
	  slug
	  title
	  image {
		url
		alternativeText
	  }
	  description
	  content
	  writer {
		slug
		name
		photo {
		  url
		  alternativeText
		}
	  }
	  published_at
	}
  }
`;

// Query: number of articles
const queryCount = `query articlesCount {
articlesCount
}
  `;

// Limit: number of posts per page
const limit = 10;

/**
 * Get the post data for a specific page with a specific limit and offset.
 * @param param0 {number} page
 * @returns  {Promise<EndpointOutput>} wthin the data property the posts are returned and the paginationData is returned
 */
export async function get({ params }): Promise<EndpointOutput> {
	const { page } = params;

	// start: the offset of the posts. To evit the index out of bounds
	const start = page == 1 ? 0 : (page - 1) * limit;

	const res = await getData(query, {
		start,
		limit
	});

	if (!res.ok) {
		return { status: res.status };
	}

	const resCount = await getData(queryCount, {});

	if (!resCount.ok) {
		return { status: res.status };
	}

	const data = await res.json();
	const dataCount = await resCount.json();

	const { articles } = data.data;
	const { articlesCount } = dataCount.data;

	// Calculate the number of pages
	const totalPages = Math.ceil(articlesCount / limit);
	const currentPage: number = parseInt(page);

	const body = {
		articles: articles,
		paginationData: { totalPages, currentPage }
	};

	return { status: res.status, body: body };
}

/***
 * Make a graphql request using fetch
 * @param {string} query the query to be executed
 * @param {object} variables the variables to pass to the query
 * @returns {Promise<Response>} response with the data
 */
async function getData(query: string, variables: unknown): Promise<Response> {
	return await fetch(`${strapiURL}/graphql`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query,
			variables
		})
	});
}
