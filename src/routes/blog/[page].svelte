<script lang="ts" context="module">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page: { params }, fetch }) => {
		const { page } = params;

		const res = await fetch(`/blog/${page}.graphql`);

		if (!res.ok) {
			return { status: res.status };
		}

		const data = await res.json();
		const { article, articles, paginationData } = data;

		return { props: { article: article, articles: articles, paginationData: paginationData } };
	};
</script>

<script lang="ts">
	import Pagination from '$lib/components/pagination.svelte';
	import Grid from '$lib/components/grid.svelte';
	import MyCard from '$lib/components/article/card.svelte';
	import PrimaryCard from '$lib/components/article/primary_card.svelte';

	export let article: Article;
	export let articles: Article[];
	export let paginationData: PaginationData;
</script>

<div class="mt-10 mb-16">
	<PrimaryCard {article} />
</div>

<Grid>
	{#each articles as article}
		<MyCard {article} />
	{/each}
</Grid>

<Pagination {paginationData} />
