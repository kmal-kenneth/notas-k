import { getData } from '$lib/utils/fetch';
import { convertArticle, generateI18nArticle, readingTime } from '$lib/utils/strapi';
import type { ArticlesResponse } from 'src/global';
import { writeFileSync, readFileSync } from 'fs';
import { timeHumans } from '$lib/utils/time';

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get({ params }) {
	const { slug } = params;

	const query = `query pageArticle($slug: String) {
		articles(filters: {slug: {eq: $slug}}) {
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
		}
	  }
	  `;

	const res = await getData(query, {
		slug: slug
	});

	if (!res.ok) {
		return { status: 404 };
	}

	const data: ArticlesResponse = await res.json();

	const { articles } = data.data;

	const article = convertArticle(articles.data.shift());

	const svx = `---
layout: article
title: ${article.title}
cover:
  url: ${article.cover.url}
  alternativeText: ${article.cover.alternativeText}
collection:
  slug: ${article.collection.slug}
  name: ${article.collection.name}
author:
  slug: ${article.writer.slug}
  name: ${article.writer.name}
date: ${timeHumans(article.publishedAt, 'es')}
time: ${readingTime(article.content)}
locales: [es]
---

${article.content}
	`;

	writeFileSync(`./src/content/es/${article.slug}.svx`, svx);

	const body = {
		articleI18n: generateI18nArticle(article),
		component: article.slug
	};

	return { body: body };
}
