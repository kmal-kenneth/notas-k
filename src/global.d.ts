/// <reference types="@sveltejs/kit" />
interface ImportMetaEnv {
	strapiURL: string;
}

interface Image {
	url: string;
	alternativeText: string;
}

interface Writer {
	slug: string;
	photo: Image;
	name: string;
}

interface Group {
	slug: string;
	name: string;
}
interface Article {
	id: number;
	title: string;
	description: string;
	content: string;
	writer: Writer;
	image: Image;
	slug: string;
	group: Group;
	created_at: string;
	updated_at: string;
	published_at: string;
}

interface PaginationData {
	currentPage: number;
	totalPages: number;
}

interface Link {
	href: string;
	text: string;
}
