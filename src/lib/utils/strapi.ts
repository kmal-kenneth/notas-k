/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { buildPaginationData } from './pagination';

/**
 * Convert json to PageMetadata object.
 * @param json - The json to convert.
 * @returns The page metadata.
 */
async function toPageMetadata(json: any): Promise<PageMetadata> {
	const { title, description } = json.data.attributes;
	const { url, alternativeText } = json.data.attributes.image.data.attributes;

	const meta: PageMetadata = {
		title: title,
		description: description,
		image: {
			url: url,
			alternativeText: alternativeText
		}
	};

	return meta;
}

/**
 * convert json to Article object.
 * @param json - The json to convert.
 * @returns The article.
 */
async function toArticle(json: any): Promise<Article> {
	const { slug, title, content, description, cover, writer, collection, publishedAt } =
		json.attributes;
	const { url, alternativeText } = cover.data.attributes;
	const { name } = writer.data.attributes;
	const { name: collectionName, slug: collectionSlug } = collection.data.attributes;

	const article: Article = {
		slug: slug,
		title: title,
		content: content,
		description: description,
		image: {
			url: url,
			alternativeText: alternativeText
		},
		writer: {
			name: name
		},
		collection: {
			name: collectionName,
			slug: collectionSlug
		},
		publishedAt: publishedAt
	};

	return article;
}

/**
 * convert json to PaginationData object.
 * @param json - The json to convert.
 * @param baseUrl - The base url.
 * @param firstPage - The first page.
 * @returns The pagination data.
 */
async function toPaginationData(
	json: string,
	baseUrl: string,
	firstPage?: string
): Promise<PaginationData> {
	const data = await JSON.parse(JSON.stringify(json));

	const { total, page, pageSize, pageCount } = data;

	const paginationData: PaginationData = buildPaginationData(
		page,
		total,
		pageCount,
		pageSize,
		baseUrl,
		firstPage
	);

	return paginationData;
}

/**
 * convert unknow to string
 * @param any any object
 * @returns  string
 */
function toUnknowToString(any) {
	return any as unknown as string;
}

export { toPageMetadata, toArticle, toPaginationData, toUnknowToString };
