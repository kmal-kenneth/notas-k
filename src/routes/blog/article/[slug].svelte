<script lang="ts" context="module">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page: { params }, fetch }) => {
		const { slug } = params;

		const res = await fetch(`/blog/article/${slug}.graphql`);

		if (!res.ok) {
			return { status: res.status };
		}

		const data = await res.json();

		return { props: { article: data.article, content: data.content } };
	};
</script>

<script lang="ts">
	import 'prism-themes/themes/prism-one-dark.css';
	import '../../../lib/assets/css/article.postcss';
	// import '/src/lib/assets/css/ prism-theme.css';

	import MyImg from '$lib/components/img.svelte';
	import { readingTime, timeHumans } from '$lib/utils/time';

	export let article: Article;
	export let content: string;
</script>

<article>
	<MyImg
		src={article.image.url}
		alt={article.image.alternativeText}
		height="384"
		class="object-cover object-center w-full h-48 rounded-lg md:h-64 lg:h-96"
	/>

	<section class="max-w-screen-lg mx-auto mt-8 mb-16 text-center">
		<h1 class="mb-6 text-4xl font-extrabold tracking-wider text-gray-800 dark:text-gray-200 ">
			{article.title}
		</h1>

		<span class="text-sm tracking-wide">
			<a
				class="font-medium text-gray-800 dark:text-gray-200"
				href={`/blog/collections/${article.group.slug}`}>{article.group.name}</a
			>
			&nbsp;&middot;&nbsp;
			<time datetime={article.published_at}>{timeHumans(article.published_at)}</time>
			&nbsp;&middot;&nbsp;
			{readingTime(article.content)} min read &nbsp;&middot;&nbsp;
			<span
				>By <a
					class="font-medium text-gray-800 dark:text-gray-200"
					href={`/blog/author/${article.writer.slug}`}>{article.writer.name}</a
				></span
			>
		</span>
	</section>

	<div class="max-w-screen-lg mx-auto">
		<!-- <div class="px-4 mb-6">
			<section class="relative mx-auto">
				<p class="mb-4">{description}</p>
				
				<nav class="">
		  <ul>
			  <li
			  v-for="link of article.toc"
			  :key="link.id"
			  :class="{
				  'font-semibold': link.depth === 2
			  }"
			  >
			  <nuxtLink
			  :to="`#${link.id}`"
			  class="hover:underline"
			  :class="{
				  'py-2': link.depth === 2,
				  'ml-2 pb-2': link.depth === 3
				}"
				>{{ link.text }}</nuxtLink
				>
			</li>
		</ul>
	</nav>
			</section>
		</div> -->

		<div class="px-4 border-b">
			<section class="mx-auto">
				<div class="content">
					{@html content}
				</div>
			</section>
		</div>
	</div>
</article>
