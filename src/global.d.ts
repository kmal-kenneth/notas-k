/// <reference types="@sveltejs/kit" />

import type { init } from 'svelte/internal';

interface ImportMetaEnv {
	VITE_STRAPI_URL: string;
	VITE_WEBSITE_URL: string;
	VITE_WEBSITE_NAME: string;
}

interface Meta {
	title: string;
	description: string;
	url: string;
	image: string;
	lenguage: string;
	canonical: string;
	robots: string;
	next?: string;
	prev?: string;
}

interface PageMetadata {
	title: string;
	description: string;
	Image: Image;
}

interface PaginationData {
	currentPage?: number;
	totalPages?: number;
	totalItems?: number;
	nextPage?: number;
	prevPage?: number;
	firstPage?: string;
	lastPage?: string;
	baseUrl?: string;
	pageSize?: number;
}

interface Link {
	href: string;
	text: string;
}

// ------------------------------------ new types for strapi v4 ------------------------------------
export interface Pagination {
	pageCount: number;
	total: number;
	page: number;
	pageSize: number;
}

export interface Image {
	url: string;
	alternativeText: string;
}

export interface Seo {
	title: string;
	description: string;
	image: Image;
	indexable: boolean;
}

export interface Home {
	seo: Seo;
	locale: string;
}

export interface Collection {
	slug: string;
	name: string;
	description: string;
	cover: Image;
	updatedAt: string;
	locale: string;
	indexable: boolean;
}

export interface Tag {
	slug: string;
	name: string;
	description: string;
	cover: Image;
	updatedAt: string;
	locale: string;
	indexable: boolean;
}

export interface Writer {
	slug: string;
	name: string;
	biography: string;
	cover: Image;
	photo: Image;
	updatedAt: string;
	locale: string;
	indexable: boolean;
}

export interface Article {
	title: string;
	description: string;
	content: string;
	locale: string;
	publishedAt: string;
	slug: string;
	cover: Image;
	writer: Writer;
	collection: Collection;
	tags: Tag[];
	indexable: boolean;
	readingTime: number;
	localizations: Article[];
}

/* --------- Responces from Strapi ---------- */

export interface ImageResponse {
	data: {
		attributes: {
			url: string;
			alternativeText: string;
		};
	};
}

export interface PaginationResponse {
	pagination: {
		pageCount: number;
		total: number;
		page: number;
		pageSize: number;
	};
}

export interface CollectionResponse {
	attributes: {
		slug: string;
		name: string;
		description: string;
		indexable: boolean;
		cover: ImageResponse;
		updatedAt: string;
		locale: string;
		localizations: {
			data: CollectionResponse[];
		};
	};
}

export interface PaginatedCollectionsResponse {
	data: {
		collections: {
			data: CollectionResponse[];
			meta: PaginationResponse;
		};
	};
}

export interface WriterResponse {
	attributes: {
		slug: string;
		name: string;
		biography: string;
		cover: ImageResponse;
		photo: ImageResponse;
		indexable: boolean;
		updatedAt: string;
		locale: string;
		localizations: {
			data: WriterResponse[];
		};
	};
}

export interface WritersResponse {
	data: {
		writers: {
			data: WriterResponse[];
		};
	};
}

export interface PaginatedWritersResponse {
	data: {
		Writers: {
			data: WriterResponse[];
			meta: PaginationResponse;
		};
	};
}

export interface TagResponse {
	attributes: {
		slug: string;
		name: string;
		description: string;
		cover: ImageResponse;
		indexable: boolean;
		updatedAt: string;
		locale: string;
		localizations: {
			data: TagResponse[];
		};
	};
}

export interface PaginatedTagsResponse {
	data: {
		tags: {
			data: TagResponse[];
			meta: PaginationResponse;
		};
	};
}

export interface ArticleResponse {
	attributes: {
		title: string;
		slug: string;
		content: string;
		description: string;
		locale: string;
		publishedAt: string;
		indexable: boolean;
		cover: ImageResponse;
		writer: { data: WriterResponse };
		collection: { data: CollectionResponse };
		tags: {
			data: TagResponse[];
		};
		localizations: {
			data: ArticleResponse[];
		};
	};
}

export interface ArticlesResponse {
	data: {
		articles: {
			data: ArticleResponse[];
		};
	};
}

export interface PaginateArticlesResponse {
	data: {
		articles: {
			data: ArticleResponse[];
			meta: PaginationResponse;
		};
	};
}

export interface SeoResponse {
	title: string;
	description: string;
	indexable: boolean;
	image: ImageResponse;
}

export interface HomeResponse {
	attributes: {
		seo: SeoResponse;
		locale: string;
		localizations: {
			data: HomeResponse[];
		};
	};
}

export interface GqlhomeResponse {
	data: {
		home: {
			data: HomeResponse;
		};
	};
}
