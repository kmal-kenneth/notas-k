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
		const { articles, paginationData } = data;

		return { props: { articles: articles, paginationData: paginationData } };
	};
</script>

<script lang="ts">
	import Pagination from '$lib/components/pagination.svelte';
	import Grid from '$lib/components/grid.svelte';
	import Card from '$lib/components/article/card.svelte';

	export let articles: Article[];
	export let paginationData: PaginationData;
</script>

<Grid>
	{#each articles as article}
		<Card {article} />
	{/each}
</Grid>

<Pagination {paginationData} />
