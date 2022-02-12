<script lang="ts">
	import MyImg from '$lib/components/img.svelte';
	import { locale } from '$lib/i18n';
	import { readingTime, timeHumans } from '$lib/utils/time';
	import type { Article } from 'src/global';

	export let article: Article;
	let a: Article = article;
	$: if (article.locale == $locale) {
		a = article;
	} else {
		a = article.localizations.find((t) => t.locale == $locale);
		a = a || article;
	}
</script>

<a sveltekit:prefetch href={'/blog/article/' + article.slug} class="flex flex-wrap no-underline">
	<MyImg
		src={a.cover.url}
		alt={a.cover.alternativeText}
		height="384"
		class="object-cover object-center w-full rounded-lg h-44 sm:h-72 md:h-96 lg:w-8/12"
	/>

	<div class="flex flex-col justify-between flex-1 lg:px-4 lg:w-4/12">
		<div>
			<div class="flex items-center justify-between mt-2 mb-1 text-xs leading-none">
				<p class="text-gray-700 dark:text-gray-300">
					<span class="font-semibold dark:text-gray-300">{a.collection.name}</span>
					&nbsp;&bull;&nbsp;
					<time datetime={a.publishedAt}>{timeHumans(a.publishedAt)}</time>
					&nbsp;&bull;&nbsp;
					{readingTime(a.content)} min read
				</p>
			</div>

			<h2
				class="my-2 overflow-hidden text-lg font-semibold tracking-normal text-gray-900 md:text-xl xl:text-2xl dark:text-gray-100 overflow-ellipsis "
			>
				{a.title}
			</h2>
			<p
				class="overflow-hidden text-base text-gray-700 md:text-lg xl:text-xl dark:text-gray-300 overflow-ellipsis"
			>
				{a.description}
			</p>
		</div>

		<div class="flex justify-end mt-4">
			<p class="ml-2 text-sm text-gray-700 dark:text-gray-300">By {a.writer.name}</p>
		</div>
	</div>
</a>
