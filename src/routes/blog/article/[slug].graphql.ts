import type { EndpointOutput } from '@sveltejs/kit';
import { Marked } from '@ts-stack/markdown';
import { MyRenderer } from '$lib/marked/renderer';
import { getData } from '$lib/utils/fetch';
import { toArticle, toUnknowToString } from '$lib/utils/strapi';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
// import hljs from 'highlight.js';

export async function get({ params }): Promise<EndpointOutput> {
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
		return { status: res.status };
	}

	const data = await res.json();

	const { articles } = data.data;

	const newArticles: Article[] = [];

	for (const article of articles.data) {
		newArticles.push(await toArticle(article));
	}

	const article = newArticles[0];

	Marked.setOptions({
		renderer: new MyRenderer(),
		highlight: function (code, lang) {
			loadLanguages(lang);

			if (Prism.languages[lang]) {
				return Prism.highlight(code, Prism.languages[lang], lang);
			} else {
				return code;
			}
		}
		// highlight: function (code, lang) {
		// 	return hljs.highlight(code, {
		// 		language: 'bash'
		// 	}).value;

		// if (hljs.listLanguages[lang]) {
		// 	return hljs.highlight(code, {
		// 		language: lang
		// 	}).value;
		// } else {
		// 	return hljs.highlightAuto(code).value;
		// }
		// }
	});

	const body = {
		article: toUnknowToString(article),
		content: Marked.parse(article.content)
	};

	return { status: res.status, body: body };
}
