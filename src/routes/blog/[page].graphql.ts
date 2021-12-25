import { getData } from '$lib/utils/fetch';
import type { EndpointOutput } from '@sveltejs/kit';
import { toArticle, toPageMetadata, toPaginationData, toUnknowToString } from '$lib/utils/strapi';

// Query: the articles of a specific page
const query = `query paginateArticles($page: Int, $pageSize: Int) {
	articles(
	  pagination: { page: $page, pageSize: $pageSize }
	  sort: "publishedAt:desc"
	) {
	  data {
		attributes {
		  slug
		  title
		  description
		  content
		  cover {
			data {
			  attributes {
				url
				alternativeText
			  }
			}
		  }
		  writer {
			data {
			  attributes {
				name
			  }
			}
		  }
		  collection {
			data {
			  attributes {
				name
				slug
			  }
			}
		  }
		  publishedAt
		}
	  }
	  meta {
		pagination {
		  total
		  page
		  pageSize
		  pageCount
		}
	  }
	}
	meta {
	  data {
		attributes {
		  title
		  description
		  image {
			data {
			  attributes {
				url
				alternativeText
			  }
			}
		  }
		}
	  }
	}
  }  
`;

// Limit: number of posts per page
const limit = 11;

export async function get({ params }): Promise<EndpointOutput> {
	const { page } = params;

	const res = await getData(query, {
		page: parseInt(page),
		pageSize: limit
	});

	if (!res.ok) {
		return { status: res.status };
	}

	const data = await res.json();

	const { articles, meta } = data.data;

	const metadata = await toPageMetadata(meta);

	const newArticles: Article[] = [];

	for (const article of articles.data) {
		newArticles.push(await toArticle(article));
	}

	const article = newArticles[0];
	newArticles.shift();

	const pagination = articles.meta.pagination;

	const paginationData = await toPaginationData(pagination, '/blog', '/');

	const body = {
		article: toUnknowToString(article),
		articles: toUnknowToString(newArticles),
		paginationData: toUnknowToString(paginationData),
		metadata: toUnknowToString(metadata)
	};

	return { status: res.status, body: body };
}
