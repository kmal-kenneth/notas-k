import type { EndpointOutput } from '@sveltejs/kit';
import { strapiURL } from '$lib/env';
import { Marked } from '@ts-stack/markdown';
import { MyRenderer } from '$lib/marked/renderer';
import prism from 'prismjs';
import loadLanguages from 'prismjs/components/';

export async function get({ params }): Promise<EndpointOutput> {
	const { slug } = params;

	const query = `query ArticlePageQuery($slug: String!) {
          articles(where: { slug: $slug }) {
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
			published_at
          }
        }`;

	const res = await fetch(`${strapiURL}/graphql`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query,
			variables: { slug }
		})
	});

	if (!res.ok) {
		return { status: res.status };
	}

	const data = await res.json();

	loadLanguages();

	Marked.setOptions({
		renderer: new MyRenderer(),
		highlight: function (code, lang) {
			if (prism.languages[lang]) {
				return prism.highlight(code, prism.languages[lang], lang);
			} else {
				return code;
			}
		}
	});

	const body = {
		article: data.data.articles[0],
		content: Marked.parse(data.data.articles[0].content)
	};

	return { status: res.status, body: body };
}
