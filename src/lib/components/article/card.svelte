<script lang="ts">
	import { goto } from '$app/navigation';

	import CImage from '$lib/components/img.svelte';
	import { readingTime, timeHumans } from '$lib/utils/time';

	export let article: Article;
	export let label: string = '';
</script>

<div
	class="
  flex flex-col
  justify-between
  w-full
  h-full
  overflow-hidden
  tracking-wide
  bg-white
  border
  rounded-lg
"
	on:click={() => goto('/blog/article/' + article.slug)}
>
	<div>
		<CImage
			src={article.image.url}
			alt={article.image.alternativeText}
			height="384"
			class=" object-cover object-center
  w-full
  border-b
  h-60
  md:h-48
  xl:h-48
  2xl:h-52"
		/>

		<div class="px-4 py-2">
			<p v-if="label" class="flex justify-end text-sm text-gray-400">
				{label}
			</p>
			<h2 class="text-lg font-bold tracking-normal text-gray-700">
				{article.title}
			</h2>
			<p class="text-sm text-gray-600">
				{article.description}
			</p>
		</div>
	</div>

	<div class="flex items-center justify-between px-4 py-2 text-xs leading-none">
		<div class="flex items-center">
			<CImage
				src={article.writer.photo.url}
				alt={article.writer.photo.alternativeText}
				height="48"
				width="48"
				class=" object-cover object-center w-6 h-6 bg-gray-200 rounded-full"
			/>

			<p class="ml-2 text-gray-500">{article.writer.name}</p>
		</div>

		<div>
			<p class="text-gray-500">
				<time datetime={article.published_at}>{timeHumans(article.published_at)}</time>
				&nbsp;&bull;&nbsp;
				{readingTime(article.content)} min read
			</p>
		</div>
	</div>
</div>
