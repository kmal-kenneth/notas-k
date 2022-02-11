import { getData } from '$lib/utils/fetch';
import { convertSeo } from '$lib/utils/strapi';
import type { GqlhomeResponse } from 'src/global';

const query = `query home {
    home {
      data {
        attributes {
          seo {
            title
            description
            indexable
            image {
              data {
                attributes {
                  alternativeText
                  url
                }
              }
            }
          }
          locale
          localizations {
            data {
              attributes {
                seo {
                  title
                  description
                  indexable
                  image {
                    data {
                      attributes {
                        alternativeText
                        url
                      }
                    }
                  }
                }
                locale
              }
            }
          }
        }
      }
    }
  }  
  `;

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get() {
	const res = await getData(query, {});

	if (!res.ok) {
		return { status: 404 };
	}

	const data: GqlhomeResponse = await res.json();

	const { seo } = data.data.home.data.attributes;

	const body = {
		seo: convertSeo(seo)
	};

	return { body: body };
}
