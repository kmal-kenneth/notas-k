<script lang="ts">
	import { range } from '$lib/utils/utils';

	export let paginationData: PaginationData;
	export let baseUrl: string = '.';
	export let sidePages: number = 2;

	let start = 0;
	let end = 0;

	$: start =
		paginationData.currentPage - sidePages < 1 ? 1 : paginationData.currentPage - sidePages;
	$: end =
		paginationData.currentPage + sidePages > paginationData.totalPages
			? paginationData.totalPages
			: paginationData.currentPage + sidePages;
</script>

{#if paginationData.totalPages > 1}
	<div class="flex flex-col items-center my-12">
		<ul class="flex text-gray-700 font-medium">
			{#if paginationData.currentPage > 1}
				<li class="arrow mr-1">
					<a sveltekit:prefetch href={`${baseUrl}/${paginationData.currentPage - 1}`} class="">
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
							class="feather feather-chevron-left w-4 h-4"
						>
							<polyline points="15 18 9 12 15 6" />
						</svg>
					</a>
				</li>
			{/if}

			{#if start > 1}
				<li class="item">
					<a sveltekit:prefetch href={`${baseUrl}/1`}> 1 </a>
				</li>

				{#if start > 2}
					<li class="dots">...</li>
				{/if}
			{/if}

			{#each range(start, end) as item}
				<li class="item" class:active={paginationData.currentPage == item}>
					<a sveltekit:prefetch href={`${baseUrl}/${item}`}>
						{item}
					</a>
				</li>
			{/each}

			{#if end < paginationData.totalPages}
				{#if end + 1 < paginationData.totalPages}
					<li class="dots">...</li>
				{/if}

				<li class="item">
					<a sveltekit:prefetch href={`${baseUrl}/${paginationData.totalPages}`}
						>{paginationData.totalPages}</a
					>
				</li>
			{/if}

			{#if paginationData.currentPage < paginationData.totalPages}
				<li class="arrow ml-1">
					<a sveltekit:prefetch href={`${baseUrl}/${paginationData.currentPage + 1}`}>
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
							class="feather feather-chevron-right w-4 h-4"
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
</style>
