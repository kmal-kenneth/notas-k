<script lang="ts" context="module">
	export const prerender = true;

	import { MetaApp } from '$lib/components';
	import MyCard from '$lib/components/article/card.svelte';
	import PrimaryCard from '$lib/components/article/primary_card.svelte';
	import Grid from '$lib/components/grid.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import type { Load } from '@sveltejs/kit';
	import type { Article, I18nObject, Meta, PaginationData, Seo } from 'src/global';

	/** @type {import('@sveltejs/kit').Load} */
	export const load: Load = async ({ fetch, url }) => {
		const response = await fetch(`/blog/${1}.graphql`);
		const resSeo = await fetch(`home.graphql`);

		if (!response.ok || !resSeo.ok) {
			return { status: response.status, error: await response.text() };
		}

		const data = await response.json();
		const {
			article,
			articles,
			paginationData
		}: {
			article: I18nObject;
			articles: I18nObject[];
			paginationData: PaginationData;
		} = data;
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
				article,
				articles,
				paginationData,
				meta
			}
		};
	};
</script>

<script lang="ts">
	export let article: { [key: string]: Article };
	export let articles: { [key: string]: Article }[];
	export let paginationData: PaginationData;
	export let meta: Meta;
</script>

<MetaApp {meta} />

<section class="px-4 mb-16">
	<PrimaryCard articleI18n={article} />
</section>

<section class="px-4">
	<Grid>
		{#each articles as article}
			<MyCard articleI18n={article} />
		{/each}
	</Grid>
</section>

<Pagination {paginationData} />
