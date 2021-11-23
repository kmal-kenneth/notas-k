import { getData } from '$lib/utils/fetch';
import type { EndpointOutput } from '@sveltejs/kit';

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
		name
	  }
	  group{
		name
	  }
	  published_at
	}
  }
`;

// Query: metadata
const queryMetadata = `query metadata {
	meta {
		title
		description
		image {
		  url
		  alternativeText
		}
	  }
	}`;

// Limit: number of posts per page
const limit = 3;

/**
 * Get the post data for a specific page with a specific limit and offset.
 * @param param0 {number} page
 * @returns  {Promise<EndpointOutput>} wthin the data property the posts are returned and the paginationData is returned
 */
export async function get(): Promise<EndpointOutput> {
	const page = 1;

	// start: the offset of the posts. To evit the index out of bounds
	const start = page == 1 ? 0 : (page - 1) * limit;

	const res = await getData(query, {
		start,
		limit
	});

	if (!res.ok) {
		return { status: res.status };
	}

	const resMeta = await getData(queryMetadata, {});

	if (!resMeta.ok) {
		return { status: resMeta.status };
	}

	const data = await res.json();
	const dataMeta = await resMeta.json();

	const { articles } = data.data;
	const { meta } = dataMeta.data;

	const article = articles[0];
	articles.shift();

	const body = {
		article: article,
		articles: articles,
		metadata: meta
	};

	return { status: res.status, body: body };
}
