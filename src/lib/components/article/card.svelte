<script lang="ts">
	import { goto } from '$app/navigation';

	import MyImg from '$lib/components/img.svelte';
	import { readingTime, timeHumans } from '$lib/utils/time';

	export let article: Article;
</script>

<div on:click={() => goto('/blog/article/' + article.slug)} class="flex flex-wrap">
	<MyImg
		src={article.image.url}
		alt={article.image.alternativeText}
		height="384"
		class=" object-cover object-center rounded-lg w-full h-64 "
	/>

	<div class=" ">
		<div class="flex items-center justify-between pt-2 pb-1 text-xs leading-none">
			<p class="text-gray-600">
				<span class="text-gray-700 font-semibold">{article.group.name}</span>
				&nbsp;&bull;&nbsp;
				<time datetime={article.published_at}>{timeHumans(article.published_at)}</time>
				&nbsp;&bull;&nbsp;
				{readingTime(article.content)} min read
			</p>
		</div>

		<h2 class="text-xl font-semibold tracking-normal text-gray-900">
			{article.title}
		</h2>
		<p class="text-base text-gray-800">
			{article.description}
		</p>
	</div>
</div>
