import type { EndpointOutput } from '@sveltejs/kit';
import { getData } from '$lib/utils/fetch';

export async function get({ params }): Promise<EndpointOutput> {
	const { slug } = params;

	const query = `query AuthorPageQuery($slug: String!) {
		authors(where: { slug: $slug }) {
			slug
			name
			photo{
			  url
			  alternativeText
			}
			cover {
			  url
			  alternativeText
			}
			biography
          }
        }`;

	const res = await getData(query, { slug });

	if (!res.ok) {
		return { status: res.status };
	}

	const data = await res.json();

	const { authors } = data.data;

	const body = {
		writer: authors[0]
	};

	return { status: res.status, body: body };
}
