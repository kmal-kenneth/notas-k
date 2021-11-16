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

	import ArticleHeader from '$lib/components/article/header.svelte';
	import { readingTime, timeHumans } from '$lib/utils/time';

	export let article: Article;
	export let content: string;
</script>

<article>
	<ArticleHeader
		src={article.image.url}
		alt={article.image.alternativeText}
		static-="false"
		opacity={0}
	/>

	<div
		class="
  mx-auto
  mb-16
  overflow-x-hidden
  text-gray-800
  sm:pxi-0
  dark:text-gray-500
  
"
	>
		<section class="px-0 pt-8 mx-4 text-center lg:mx-32 md:mx-16 sm:mx-8">
			<h1 class="mb-6 font-extrabold tracking-wider text-gray-800 dark:text-gray-400 text-4xl  ">
				{article.title}
			</h1>
			<span class="text-sm tracking-wide">
				<a class="font-medium" href={`/blog/collections/${article.slug}`}>{article.group.name}</a>
				&nbsp;&middot;&nbsp;
				<time datetime={article.published_at}>{timeHumans(article.published_at)}</time>
				&nbsp;&middot;&nbsp;
				{readingTime(article.content)} min read
			</span>
		</section>
	</div>
	<div class="lg:mx-auto md:mx-16 px-4 max-w-screen-lg">
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
