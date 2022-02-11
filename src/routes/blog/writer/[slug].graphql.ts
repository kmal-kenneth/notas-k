import { getData } from '$lib/utils/fetch';
import { convertWriter } from '$lib/utils/strapi';
import type { ArticleResponse, Writer, WriterResponse, WritersResponse } from 'src/global';

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get({ params }) {
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
		return { status: 404 };
	}

	const data: WritersResponse = await res.json();

	const { writers } = data.data;

	const body = {
		writer: convertWriter(writers.data.shift())
	};

	return { body: body };
}
