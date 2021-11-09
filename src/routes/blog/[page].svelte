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

	export let articles: Article[];
	export let paginationData: PaginationData;
</script>

{#each articles as article, i}
	<li>
		{i + 1}: {article.title}
	</li>
{/each}

{paginationData.totalPages}
<Pagination {paginationData} />
