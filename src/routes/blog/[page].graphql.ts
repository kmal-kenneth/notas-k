import type { EndpointOutput } from '@sveltejs/kit';
import { strapiURL } from '$lib/env';

const query = `query ArticlePage($start: Int, $limit: Int) {
	articles(start: $start, limit: $limit, sort: "updatedAt:DESC") {
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
	  }
	  group {
		slug
		name
	  }
	  tags {
		slug
	}
	updatedAt
}
}
`;

const queryCount = `query articlesCount {
articlesCount
}
  `;

export async function get({ params }): Promise<EndpointOutput> {
	const { page } = params;

	const res = await getData(query, {
		start: page - 1,
		limit: 1
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
	const totalPages = Math.ceil(articlesCount / 1);

	const currentPage: number = parseInt(page);

	const body = {
		articles: articles,
		paginationData: { totalPages, currentPage }
	};

	return { status: res.status, body: body };
}

/***
 * Make a graphql request using fetch
 * @param {string} query
 * @param {object} variables
 * @returns {Promise<Response>}
 * @private
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
