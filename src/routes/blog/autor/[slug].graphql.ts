import { getData } from '$lib/utils/fetch';
import { convertWriter, generateI18nObject } from '$lib/utils/strapi';
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
				  biography
				  cover {
					data {
					  attributes {
						url
						alternativeText
					  }
					}
				  }
				  photo {
					data {
					  attributes {
						url
						alternativeText
					  }
					}
				  }
				  indexable
				  updatedAt
				  locale
				  localizations {
					data {
					  attributes {
						slug
						name
						biography
						cover {
						  data {
							attributes {
							  url
							  alternativeText
							}
						  }
						}
						photo {
						  data {
							attributes {
							  url
							  alternativeText
							}
						  }
						}
						indexable
						updatedAt
						locale
					  }
					}
				  }
				}
			  }
			}
		  }
		  `;

	const res = await getData(query, { slug });

	if (!res.ok) {
		return { status: 404 };
	}

	const data: WritersResponse = await res.json();

	const { writers } = data.data;

	const writer = convertWriter(writers.data.shift());

	const body = {
		writer: generateI18nObject(writer)
	};

	return { body: body };
}
