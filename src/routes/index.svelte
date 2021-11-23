<script lang="ts" context="module">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page: { path }, fetch }) => {
		const res = await fetch(`/index.graphql`);

		if (!res.ok) {
			return { status: res.status };
		}

		const data = await res.json();
		const { article, articles } = data;

		const metadata: PageMetadata = data.metadata || {};

		const meta: Meta = {
			title: `${metadata.title}`,
			description: metadata.description,
			url: `${import.meta.env.VITE_WEBSITE_URL}${path}`,
			image: metadata.image.url,
			lenguage: 'es',
			canonical: `${import.meta.env.VITE_WEBSITE_URL}${path}`,
			robots: 'index, follow'
		};

		return {
			props: {
				article: article,
				articles: articles,
				metadata: meta
			}
		};
	};
</script>

<script lang="ts">
	import { PrimaryCardArticle, GridApp, CardArticle, MetaApp } from '$lib/components';

	export let article: Article;
	export let articles: Article[];
	export let metadata: Meta;
</script>

<MetaApp meta={metadata} />

<div class="my-4">
	<h1 class="text-center text-3xl font-bold">My wonderful blog</h1>
</div>

<div class="mt-10 mb-16">
	<PrimaryCardArticle {article} />
</div>

<GridApp>
	{#each articles as article}
		<CardArticle {article} />
	{/each}
</GridApp>
