<script lang="ts" context="module">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page: { params, path }, fetch }) => {
		const { slug } = params;

		const res = await fetch(`/blog/article/${slug}.graphql`);

		if (!res.ok) {
			return { status: res.status };
		}

		const { article, content } = await res.json();

		const meta: Meta = {
			title: `${article.title} | notas {K}`,
			description: article.description,
			url: `${import.meta.env.VITE_WEBSITE_URL}${path}`,
			image: article.image.url,
			lenguage: 'es',
			canonical: `${import.meta.env.VITE_WEBSITE_URL}${path}`,
			robots: 'index, follow'
		};

		return { props: { article: article, content: content, meta: meta } };
	};
</script>

<script lang="ts">
	import 'prism-themes/themes/prism-one-dark.css';
	// import 'highlight.js/styles/atom-one-dark.css';
	import '../../../lib/assets/css/article.postcss';

	import { MetaApp, ImageApp } from '$lib/components/';

	import { readingTime, timeHumans } from '$lib/utils/time';

	export let article: Article;
	export let content: string;
	export let meta: Meta;
</script>

<MetaApp {meta} />

<article>
	<section class="px-4">
		<ImageApp
			src={meta.image}
			alt={article.image.alternativeText}
			height="768"
			class="object-cover object-center w-full h-48 rounded-lg sm:h-80 md:h-96"
		/>
	</section>

	<section class="max-w-screen-lg mx-auto mt-8 mb-16 text-center">
		<h1
			class="mb-6 text-2xl font-extrabold tracking-wider text-gray-800 sm:text-3xl lg:text-4xl dark:text-gray-200 "
		>
			{article.title}
		</h1>

		<span class="text-sm tracking-wide">
			<a
				class="font-medium text-gray-800 dark:text-gray-200"
				href={`#/blog/collections/${article.collection.slug}`}>{article.collection.name}</a
			>
			&nbsp;&middot;&nbsp;
			<time datetime={article.publishedAt}>{timeHumans(article.publishedAt)}</time>
			&nbsp;&middot;&nbsp;
			{readingTime(article.content)} min read &nbsp;&middot;&nbsp;
			<span
				>By <a
					class="font-medium text-gray-800 dark:text-gray-200"
					href={`/blog/writer/${article.writer.slug}`}>{article.writer.name}</a
				></span
			>
		</span>
	</section>

	<section class="max-w-screen-lg mx-auto">
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
	</section>
</article>
