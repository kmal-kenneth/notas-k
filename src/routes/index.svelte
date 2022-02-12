<script lang="ts" context="module">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';

	/** @type {import('@sveltejs/kit').Load} */
	export const load: Load = async ({ fetch, url }) => {
		const response = await fetch(`/blog/${1}.graphql`);
		const resSeo = await fetch(`home.graphql`);

		if (!response.ok || !resSeo.ok) {
			return { status: response.status, error: await response.text() };
		}

		const data = await response.json();
		const { article, articles, paginationData } = data;
		// const paginationData: PaginationData = data.paginationData || {};

		const dataSeo = await resSeo.json();
		const { seo } = dataSeo;

		const meta: Meta = {
			title: seo.title,
			description: seo.description,
			url: `${import.meta.env.VITE_WEBSITE_URL}${url.pathname}`,
			image: seo.image.url,
			lenguage: 'es',
			canonical: `${import.meta.env.VITE_WEBSITE_URL}${url.pathname}`,
			robots: 'index, follow',
			next: paginationData.nextPage
				? `${import.meta.env.VITE_WEBSITE_URL}/blog/${paginationData.nextPage}`
				: null,
			prev: paginationData.prevPage
				? `${import.meta.env.VITE_WEBSITE_URL}/blog/${paginationData.prevPage}`
				: null
		};

		return {
			status: response.status,
			props: {
				article: article,
				articles: articles,
				paginationData: paginationData,
				metadata: meta
			}
		};
	};
</script>

<script lang="ts">
	import Pagination from '$lib/components/pagination.svelte';
	import Grid from '$lib/components/grid.svelte';
	import MyCard from '$lib/components/article/card.svelte';
	import PrimaryCard from '$lib/components/article/primary_card.svelte';
	import { MetaApp } from '$lib/components';
	import type { Article, Meta, PaginationData } from 'src/global';

	export let article: Article;
	export let articles: Article[];
	export let paginationData: PaginationData;
	export let metadata: Meta;
</script>

<MetaApp meta={metadata} />

<section class="px-4 mt-10 mb-16">
	<PrimaryCard {article} />
</section>

<section class="px-4">
	<Grid>
		{#each articles as article}
			<MyCard {article} />
		{/each}
	</Grid>
</section>

<Pagination {paginationData} />
