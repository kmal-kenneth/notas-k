<script lang="ts" context="module">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page: { params, path }, fetch }) => {
		const { page } = params;

		const res = await fetch(`/blog/${page}.graphql`);

		if (!res.ok) {
			return { status: res.status };
		}

		const data = await res.json();
		const { article, articles } = data;

		const metadata: PageMetadata = data.metadata || {};
		const paginationData: PaginationData = data.paginationData || {};

		const meta: Meta = {
			title: `Pagina ${paginationData.currentPage} - ${metadata.title}`,
			description: metadata.description,
			url: `${import.meta.env.VITE_WEBSITE_URL}${path}`,
			image: metadata.image.url,
			lenguage: 'es',
			canonical: `${import.meta.env.VITE_WEBSITE_URL}${path}`,
			robots: 'index, follow',
			next: paginationData.nextPage
				? `${import.meta.env.VITE_WEBSITE_URL}/blog/${paginationData.nextPage}`
				: null,
			prev: paginationData.prevPage
				? `${import.meta.env.VITE_WEBSITE_URL}/blog/${paginationData.prevPage}`
				: null
		};

		return {
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

	export let article: Article;
	export let articles: Article[];
	export let paginationData: PaginationData;
	export let metadata: Meta;
</script>

<MetaApp meta={metadata} />

<div class="mt-10 mb-16">
	<PrimaryCard {article} />
</div>

<Grid>
	{#each articles as article}
		<MyCard {article} />
	{/each}
</Grid>

<Pagination {paginationData} />
