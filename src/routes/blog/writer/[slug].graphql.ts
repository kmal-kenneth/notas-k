import type { EndpointOutput } from '@sveltejs/kit';
import { getData } from '$lib/utils/fetch';
import { toUnknowToString, toWriter } from '$lib/utils/strapi';

export async function get({ params }): Promise<EndpointOutput> {
	const { slug } = params;

	const query = `query pageWriter($slug: String) {
		writers(filters: { slug: { eq: $slug } }) {
		  data {
			attributes {
			  slug
			  name
			  photo {
				data {
				  attributes {
					alternativeText
					url
				  }
				}
			  }
			  cover {
				data {
				  attributes {
					url
					alternativeText
				  }
				}
			  }
			  biography
			}
		  }
		}
	  }`;

	const res = await getData(query, { slug });

	if (!res.ok) {
		return { status: res.status };
	}

	const data = await res.json();

	const { writers } = data.data;

	const newWriters: Writer[] = [];

	for (const writerT of writers.data) {
		newWriters.push(await toWriter(writerT));
	}

	const writer = newWriters[0];

	const body = {
		writer: toUnknowToString(writer)
	};

	return { status: res.status, body: body };
}
