/// <reference types="@sveltejs/kit" />
interface ImportMetaEnv {
	strapiURL: string;
}

interface Image {
	url: string;
	alternativeText: string;
}

interface Author {
	slug: string;
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
	author: Author;
	created_at: string;
	updated_at: string;
	image: Image;
	updatedAt: string;
	slug: string;
	group: Group;
}
