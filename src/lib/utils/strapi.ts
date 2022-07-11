/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import MarkdownIt from 'markdown-it';
import mk from 'markdown-it-katex';
// import katex from 'katex';
import hljs from 'highlight.js';
import type {
	ImageResponse,
	Image,
	CollectionResponse,
	Collection,
	Writer,
	WriterResponse,
	Tag,
	TagResponse,
	ArticleResponse,
	Article,
	Seo,
	SeoResponse,
	HomeResponse,
	Home,
	PaginationData,
	Pagination,
	I18nObject
} from 'src/global';

/**
 * Calculate when time take to read
 * @param {string} content
 * @returns {number}
 */
function readingTime(content: string): number {
	const wordsPerMinute = 200;
	const contentString = JSON.stringify(content);
	const words = contentString.split(' ').length;

	return Math.ceil(words / wordsPerMinute);
}

/**
 * Clone object
 * @param {object} object
 * @param { string[]} - list of keys to exclude
 * @returns {object}
 */
function cloneObject(object: unknown, blackList: string[] = []): any {
	const clone = {};

	Object.keys(object).forEach((key) => {
		if (blackList.includes(key) === false) {
			clone[key] = object[key];
		}
	});

	return clone;
}

/**
 * Convert a imageResponse to a image object
 * @param {ImageResponse} imageResponse
 * @returns {Image}
 */
function convertImage(imageResponse: ImageResponse): Image {
	const { url, alternativeText } = imageResponse.data.attributes;
	return { url, alternativeText };
}

/**
 * Convert a collectionResponce to a collection object
 * @param {CollectionResponse} collectionResponse
 * @returns {Collection}
 */
function convertCollection(collectionResponse: CollectionResponse): Collection {
	const { slug, name, description, cover, updatedAt, locale, indexable } =
		collectionResponse.attributes;

	return {
		slug,
		name,
		description,
		cover: cover === undefined ? null : convertImage(cover),
		updatedAt,
		locale,
		indexable
	};
}

/**
 * Convert a writerResponce to a writer object
 * @param {WriterResponse} writerResponse
 * @returns {Writer}
 */
function convertWriter(writerResponse: WriterResponse): Writer {
	const { slug, name, biography, cover, photo, updatedAt, locale, indexable, localizations } =
		writerResponse.attributes;

	return {
		slug,
		name,
		biography,
		cover: cover === undefined ? null : convertImage(cover),
		photo: photo === undefined ? null : convertImage(photo),
		updatedAt,
		locale,
		indexable,
		localizations: localizations
			? localizations.data.map((localization) => {
					return cloneObject(convertWriter(localization), ['slug', 'localizations', 'indexable']);
			  })
			: []
	};
}

/**
 * Convert a tagResponce to a tag object
 * @param {TagResponse} tagResponse
 * @returns {Tag}
 */
function convertTag(tagResponse: TagResponse): Tag {
	const { slug, name, description, updatedAt, locale, indexable, cover } = tagResponse.attributes;

	return {
		slug,
		name,
		description,
		updatedAt,
		locale,
		indexable,
		cover: cover === undefined ? null : convertImage(cover)
	};
}

/**
 * Convert a articleResponce to a article object
 * @param {ArticleResponse} articleResponse
 * @returns {Article}
 */
function convertArticle(articleResponse: ArticleResponse): Article {
	const {
		title,
		description,
		content,
		slug,
		publishedAt,
		locale,
		indexable,
		tags,
		cover,
		writer,
		collection,
		localizations
	} = articleResponse.attributes;

	return {
		title,
		description,
		content,
		slug,
		publishedAt,
		locale,
		indexable,
		readingTime: readingTime(content),
		tags: tags.data.map((tag) => {
			return cloneObject(convertTag(tag), [
				'description',
				'updatedAt',
				'locale',
				'indexable',
				'cover'
			]);
		}),
		cover: convertImage(cover),
		writer: cloneObject(convertWriter(writer.data), [
			'biography',
			'cover',
			'photo',
			'updatedAt',
			'locale',
			'indexable'
		]),
		collection: cloneObject(convertCollection(collection.data), [
			'description',
			'cover',
			'updatedAt',
			'locale',
			'indexable',
			'indexable'
		]),
		localizations: localizations
			? localizations.data.map((localization) => {
					return cloneObject(convertArticle(localization), ['slug', 'localizations', 'indexable']);
			  })
			: []
	};
}

/**
 * Convert a seoResponce to a seo object
 * @param {SeoResponse} seoResponse
 * @returns {Seo}
 */
function convertSeo(seoResponse: SeoResponse): Seo {
	const { title, description, image, indexable } = seoResponse;

	return {
		title,
		description,
		image: image === undefined ? null : convertImage(image),
		indexable
	};
}

/**
 * Convert a homeResponce to a home object
 * @param {HomeResponse} homeResponse
 * @returns {Home}
 */
function convertHome(homeResponse: HomeResponse): Home {
	const { seo, locale } = homeResponse.attributes;
	return {
		seo: convertSeo(seo),
		locale
	};
}

/**
 * Convert pagination to pagination data
 * @param {Pagination} pagination
 * @param {string} baseUrl
 * @param {string} firstPage
 * @returns {PaginationData}
 */
function convertPaginationData(
	pagination: Pagination,
	baseUrl: string,
	firstPage?: string
): PaginationData {
	const { pageCount, page, pageSize, total } = pagination;

	const paginationData: PaginationData = {
		totalPages: pageCount,
		currentPage: page,
		prevPage: page > 1 ? page - 1 : null,
		nextPage: page < pageCount ? page + 1 : null,
		totalItems: total,
		firstPage: firstPage ? firstPage : `${baseUrl}/${1}`,
		lastPage: `${baseUrl}/${pageCount}`,
		baseUrl,
		pageSize
	};

	return paginationData;
}

/**
 * Generate a i18n object from article
 * @param {Article} article
 * @param {I18nObject} i18nObject
 */
function generateI18nArticle(article: Article): I18nObject {
	const md = MarkdownIt({
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang }).value;
				} catch (e) {
					console.log(e);
				}
			}

			return ''; // use external default escaping
		}
	});

	md.use(mk);

	const articleI18n: I18nObject = {};

	article.content = md.render(article.content);
	articleI18n[article.locale] = cloneObject(article, ['localizations']);

	if (article.localizations) {
		article.localizations.forEach((localization) => {
			localization.slug = article.slug;
			localization.writer = article.writer;
			localization.content = md.render(localization.content);

			articleI18n[localization.locale] = localization;

			return localization;
		});
	}

	return articleI18n;
}

/**
 * Generate a i18n object from generic object
 * @param {*} object
 * @param {I18nObject} i18nObject
 */
function generateI18nObject(object: any): I18nObject {
	const i18nObject: I18nObject = {};

	i18nObject[object.locale] = cloneObject(object, ['localizations']);

	if (object.localizations) {
		object.localizations.forEach((localization) => {
			localization.slug = object.slug;

			i18nObject[localization.locale] = localization;

			return localization;
		});
	}

	return i18nObject;
}

export {
	convertArticle,
	convertHome,
	convertSeo,
	convertTag,
	convertWriter,
	convertCollection,
	convertImage,
	cloneObject,
	readingTime,
	convertPaginationData,
	generateI18nArticle,
	generateI18nObject
};
