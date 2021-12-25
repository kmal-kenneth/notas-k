/// <reference types="@sveltejs/kit" />
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
	image: Image;
}

interface Image {
	url: string;
	alternativeText: string;
}

interface Writer {
	name: string;
	biography?: string;
	cover?: Image;
	photo?: Image;
	slug?: string;
}

interface Collection {
	slug: string;
	name: string;
}
interface Article {
	id?: number;
	title?: string;
	description?: string;
	content?: string;
	writer?: Writer;
	image?: Image;
	slug?: string;
	collection?: Collection;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
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
