import { getData } from '$lib/utils/fetch';
import { convertArticle, convertPaginationData } from '$lib/utils/strapi';
import type { Article, PaginateArticlesResponse, Seo } from 'src/global';

// Query: the articles of a specific page
const query = `query paginateArticles($page: Int, $pageSize: Int) {
    articles(
      pagination: {page: $page, pageSize: $pageSize}
      sort: "publishedAt:desc"
    ) {
      data {
        attributes {
          indexable
          content
          slug
          title
          description
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
                slug
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
          tags {
            data {
              attributes {
                name
                slug
              }
            }
          }
          publishedAt
          locale
          localizations {
            data {
              attributes {
                indexable
                content
                slug
                title
                description
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
                      slug
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
                tags {
                  data {
                    attributes {
                      name
                      slug
                    }
                  }
                }
                publishedAt
                locale
              }
            }
          }
        }
      }
      meta {
        pagination {
          pageCount
        }
      }
    }
  } 
`;

// Limit: number of posts per page
const limit = 11;

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get({ params }) {
	const { page } = params;

	const res = await getData(query, {
		page: parseInt(page),
		pageSize: limit
	});

	if (!res.ok) {
		return { status: 404 };
	}

	const data: PaginateArticlesResponse = await res.json();

	const articles: Article[] = data.data.articles.data.map((article) => convertArticle(article));
	const article = articles.shift();

	const paginationData = await convertPaginationData(
		data.data.articles.meta.pagination,
		'/blog',
		'/'
	);

	const seo: Seo = {
		title: article.title,
		description: article.description,
		image: article.cover,
		indexable: article.indexable
	};

	const body = {
		article,
		articles,
		paginationData,
		seo
	};

	return { body: body };
}
