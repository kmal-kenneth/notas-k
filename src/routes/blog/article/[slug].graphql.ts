import { Marked } from '@ts-stack/markdown';
import { MyRenderer } from '$lib/marked/renderer';
import { getData } from '$lib/utils/fetch';
import hljs from 'highlight.js';
import { convertArticle } from '$lib/utils/strapi';
import type { Article, ArticlesResponse } from 'src/global';

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get({ params }) {
	const { slug } = params;

	const query = `query pageArticle($slug: String) {
		articles(filters: { slug: { eq: $slug } }) {
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
			}
		  }
		}
	  }`;

	const res = await getData(query, {
		slug: slug
	});

	if (!res.ok) {
		return { status: 404 };
	}

	const data: ArticlesResponse = await res.json();

	const { articles } = data.data;

	const article = convertArticle(articles.data.shift());

	Marked.setOptions({
		renderer: new MyRenderer(),

		highlight: function (code, lang) {
			if (hljs.listLanguages().includes(lang)) {
				return hljs.highlight(code, {
					language: lang
				}).value;
			} else {
				return code;
			}
		}
	});

	const body = {
		article,
		content: Marked.parse(article.content)
	};

	return { body: body };
}
