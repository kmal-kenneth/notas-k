<script lang="ts">
	import MyImg from '$lib/components/img.svelte';
	import { readingTime, timeHumans } from '$lib/utils/time';

	export let article: Article;
</script>

<a sveltekit:prefetch href={'/blog/article/' + article.slug} class="flex flex-wrap">
	<MyImg
		src={article.image.url}
		alt={article.image.alternativeText}
		height="384"
		class="object-cover object-center w-full rounded-lg h-72"
	/>

	<div class="flex flex-col justify-between flex-1 ">
		<div>
			<div class="flex items-center justify-between mt-2 mb-1 text-xs leading-none">
				<p class="text-gray-600 dark:text-gray-300">
					<span class="font-semibold text-gray-700 dark:text-gray-300">{article.group.name}</span>
					&nbsp;&bull;&nbsp;
					<time datetime={article.published_at}>{timeHumans(article.published_at)}</time>
					&nbsp;&bull;&nbsp;
					{readingTime(article.content)} min read
				</p>
			</div>

			<h2
				class="my-2 overflow-hidden text-lg font-semibold tracking-normal text-gray-900 dark:text-gray-100 overflow-ellipsis "
			>
				{article.title}
			</h2>
			<p class="overflow-hidden text-base text-gray-700 dark:text-gray-300 overflow-ellipsis">
				{article.description}
			</p>
		</div>

		<div class="flex justify-end mt-4">
			<p class="ml-2 text-xs text-gray-700 dark:text-gray-300">By {article.writer.name}</p>
		</div>
	</div>
</a>
