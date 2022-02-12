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
		const { seo }: { seo: Seo } = dataSeo;

		const meta: Meta = {
			title: seo.title,
			description: seo.description,
			url: `${url}`,
			image: seo.image.url,
			lenguage: 'es',
			canonical: `${url}`,
			robots: seo.indexable ? 'index, follow' : 'noindex, nofollow',
			next: paginationData.nextPage ? `${url.origin}/blog/${paginationData.nextPage}` : null,
			prev: paginationData.prevPage ? `${url.origin}/blog/${paginationData.prevPage}` : null
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
	import type { Article, Meta, PaginationData, Seo } from 'src/global';

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
