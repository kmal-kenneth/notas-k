<script lang="ts">
	import { range } from '$lib/utils/utils';

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
	<div class="flex flex-col items-center my-12 pagination">
		<ul class="flex font-medium text-gray-700">
			{#if previews}
				<li class="mr-1 ">
					<a sveltekit:prefetch href={`${previews}`} class="arrow">
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
				</li>
			{/if}

			{#if start > 1}
				<li class="item">
					<a sveltekit:prefetch href={`${paginationData.firstPage}`}> 1 </a>
				</li>

				{#if start > 2}
					<li class="dots">...</li>
				{/if}
			{/if}

			{#each range(start, end) as item}
				<li class="item" class:active={paginationData.currentPage == item}>
					{#if item == 1}
						<a sveltekit:prefetch href={paginationData.firstPage}>
							{item}
						</a>
					{:else}
						<a sveltekit:prefetch href={`${paginationData.baseUrl}/${item}`}>
							{item}
						</a>
					{/if}
				</li>
			{/each}

			{#if end < paginationData.totalPages}
				{#if end + 1 < paginationData.totalPages}
					<li class="dots">...</li>
				{/if}

				<li class="item">
					<a sveltekit:prefetch href={`${paginationData.baseUrl}/${paginationData.totalPages}`}
						>{paginationData.totalPages}</a
					>
				</li>
			{/if}

			{#if next}
				<li class="ml-1">
					<a sveltekit:prefetch href={`${next}`} class="arrow">
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
				</li>
			{/if}
		</ul>
	</div>
{/if}

<style lang="postcss">
	.pagination {
		a {
			@apply no-underline;
		}
		.item {
			@apply w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in hover:text-pink-900 text-gray-500;
		}

		.dots {
			@apply w-8 md:flex justify-center items-center hidden leading-5 transition duration-150 ease-in text-gray-500;
		}

		.active {
			@apply border-b-4 border-pink-900 text-pink-900 font-bold flex;
		}

		.arrow {
			@apply h-8 w-8 flex justify-center items-center cursor-pointer hover:text-pink-900 text-gray-500;
		}
	}
</style>
