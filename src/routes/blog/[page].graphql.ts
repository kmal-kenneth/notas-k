import { getData } from '$lib/utils/fetch';
import { convertArticle, convertPaginationData, generateI18nArticle } from '$lib/utils/strapi';
import type { Article, I18nObject, PaginateArticlesResponse } from 'src/global';

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

	const articles: I18nObject[] = data.data.articles.data.map((article) =>
		generateI18nArticle(convertArticle(article))
	);
	const article = articles.shift();

	const paginationData = await convertPaginationData(
		data.data.articles.meta.pagination,
		'/blog',
		'/'
	);

	const body = {
		article,
		articles,
		paginationData
	};

	return { body: body };
}
