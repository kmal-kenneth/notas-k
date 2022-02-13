<script lang="ts" context="module">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';

	/** @type {import('@sveltejs/kit').Load} */
	export const load: Load = async ({ fetch, url, params }) => {
		const { slug } = params;

		const res = await fetch(`/blog/article/${slug}.graphql`);

		if (!res.ok) {
			return { status: res.status };
		}

		const { articleI18n }: { articleI18n: { [key: string]: Article } } = await res.json();

		const meta = {
			title: `${articleI18n.es.title} | notas {K}`,
			description: articleI18n.es.description,
			url: `${url}`,
			image: articleI18n.es.cover.url,
			lenguage: 'es',
			canonical: `${url}`,
			robots: articleI18n.es.indexable ? 'index, follow' : 'noindex, nofollow'
		};

		return { props: { articleI18n, meta } };
	};
</script>

<script lang="ts">
	import lozad from 'lozad';

	import 'highlight.js/styles/atom-one-dark.css';

	import { MetaApp, ImageApp } from '$lib/components/';

	import { readingTime, timeHumans } from '$lib/utils/time';
	import type { Article, I18nObject, Meta } from 'src/global';
	import { onMount } from 'svelte';
	import { locale } from '$lib/i18n';

	onMount(async () => {
		const observer = lozad(); // lazy loads elements with default selector as '.lozad'
		observer.observe();
	});

	export let articleI18n: { [key: string]: Article };
	export let meta: Meta;

	let article: Article;

	$: if (articleI18n[$locale]) {
		article = articleI18n[$locale];
	} else {
		article = articleI18n.es;
	}
</script>

<MetaApp {meta} />

<article>
	<header class="px-4">
		<ImageApp
			src={article.cover.url}
			alt={article.cover.alternativeText}
			height="768"
			class="object-cover object-center w-full h-48 rounded-lg sm:h-80 md:h-96"
		/>
	</header>

	<section
		class="max-w-5xl px-4 mx-auto my-4 prose border-b prose-slate dark:prose-invert lg:prose-lg lg:w-max "
	>
		<header class="mt-8 mb-16 text-center ">
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
				{article.readingTime} min read &nbsp;&middot;&nbsp;
				<span
					>By <a
						class="font-medium text-gray-800 dark:text-gray-200"
						href={`/blog/writer/${article.writer.slug}`}>{article.writer.name}</a
					></span
				>
			</span>
		</header>

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

		<div class=" content">
			{@html article.content}
		</div>
	</section>
</article>
