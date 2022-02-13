<script lang="ts">
	import { range } from '$lib/utils/utils';
	import type { PaginationData } from 'src/global';

	export let paginationData: PaginationData;
	export let sidePages: number = 2;

	let start = 0;
	let end = 0;

	// previes previous: current page == 1 else null but current page == 2 else first page but current page > 2 else  current page - 1
	let previews: string | null = null;
	// next next: current page == total pages else null but current page == total pages - 1 else last page else  total pages + 1
	let next: string | null = null;

	$: start =
		paginationData.currentPage - sidePages < 1 ? 1 : paginationData.currentPage - sidePages;
	$: end =
		paginationData.currentPage + sidePages > paginationData.totalPages
			? paginationData.totalPages
			: paginationData.currentPage + sidePages;

	$: previews =
		paginationData.currentPage == 1
			? null
			: paginationData.currentPage == 2
			? paginationData.firstPage
			: `${paginationData.baseUrl}/${paginationData.prevPage}`;

	$: next =
		paginationData.currentPage == paginationData.totalPages
			? null
			: paginationData.currentPage == paginationData.totalPages - 1
			? paginationData.lastPage
			: `${paginationData.baseUrl}/${paginationData.nextPage}`;
</script>

{#if paginationData.totalPages > 1}
	<div class="flex items-center justify-center my-12 pagination">
		{#if previews}
			<a sveltekit:prefetch href={`${previews}`} class="mr-1 arrow" aria-label="Página anterior">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-4 h-4 feather feather-chevron-left"
				>
					<polyline points="15 18 9 12 15 6" />
				</svg>
			</a>
		{/if}

		{#if start > 1}
			<a sveltekit:prefetch href={`${paginationData.firstPage}`}> 1 </a>

			{#if start > 2}
				<div class="dots">...</div>
			{/if}
		{/if}

		{#each range(start, end) as item}
			{#if item == 1}
				<a
					sveltekit:prefetch
					href={paginationData.firstPage}
					class:active={paginationData.currentPage == item}
				>
					{item}
				</a>
			{:else}
				<a
					sveltekit:prefetch
					href={`${paginationData.baseUrl}/${item}`}
					class:active={paginationData.currentPage == item}
				>
					{item}
				</a>
			{/if}
		{/each}

		{#if end < paginationData.totalPages}
			{#if end + 1 < paginationData.totalPages}
				<div class="dots">...</div>
			{/if}

			<a sveltekit:prefetch href={`${paginationData.baseUrl}/${paginationData.totalPages}`}
				>{paginationData.totalPages}</a
			>
		{/if}

		{#if next}
			<a sveltekit:prefetch href={`${next}`} class="ml-1 arrow" aria-label="Página siguiente">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-4 h-4 feather feather-chevron-right"
				>
					<polyline points="9 18 15 12 9 6" />
				</svg></a
			>
		{/if}
	</div>
{/if}
