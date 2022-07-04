<script lang="ts">
	import MyImg from '$lib/components/img.svelte';
	import { readingTime, timeHumans } from '$lib/utils/time';
	import type { Article } from 'src/global';
	import { getLanguageStore, T } from '@tolgee/svelte';

	const languageStore = getLanguageStore();

	export let articleI18n: { [key: string]: Article };

	let article: Article;

	let onlyEs = articleI18n.en ? false : true;

	$: if (articleI18n[$languageStore]) {
		article = articleI18n[$languageStore];
	} else {
		article = articleI18n.es;
	}
</script>

<a sveltekit:prefetch href={'/blog/article/' + article.slug} class="flex flex-wrap no-underline">
	<MyImg
		src={article.cover.url}
		alt={article.cover.alternativeText}
		height="384"
		class="object-cover object-center w-full rounded-lg h-44 sm:h-72 md:h-96 lg:w-8/12"
	/>

	<div class="flex flex-col justify-between flex-1 lg:px-4 lg:w-4/12">
		<div>
			<div class="flex items-center justify-between mt-2 mb-1 text-xs leading-none">
				<p class="text-gray-700 dark:text-gray-300">
					<span class="font-semibold dark:text-gray-300">{article.collection.name}</span>
					&nbsp;&bull;&nbsp;
					<time datetime={article.publishedAt}>{timeHumans(article.publishedAt)}</time>
					&nbsp;&bull;&nbsp;
					{readingTime(article.content)} min read
				</p>

				{#if onlyEs}
					<p
						class="bg-yellow-300 text-yellow-900 p-1 rounded border border-yellow-600 dark:border-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
					>
						<T keyName="only_spanish_card" />
					</p>
				{/if}
			</div>

			<h2
				class="my-2 overflow-hidden text-lg font-semibold tracking-normal text-gray-900 md:text-xl xl:text-2xl dark:text-gray-100 overflow-ellipsis "
			>
				{article.title}
			</h2>
			<p
				class="overflow-hidden text-base text-gray-700 md:text-lg xl:text-xl dark:text-gray-300 overflow-ellipsis"
			>
				{article.description}
			</p>
		</div>

		<div class="flex justify-end mt-4">
			<p class="ml-2 text-sm text-gray-700 dark:text-gray-300">By {article.writer.name}</p>
		</div>
	</div>
</a>
