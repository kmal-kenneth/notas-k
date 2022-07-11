<script lang="ts" context="module">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';

	/** @type {import('@sveltejs/kit').Load} */
	export const load: Load = async ({ fetch, url, params }) => {
		const { slug } = params;

		const res = await fetch(`/blog/articulo/${slug}.graphql`);

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
	import { ArticleData, ImageApp, MetaApp } from '$lib/components/';
	import { timeHumans } from '$lib/utils/time';
	import { getLanguageStore, getTranslate, T } from '@tolgee/svelte';
	import 'prism-themes/themes/prism-material-oceanic.css';
	import lozad from 'lozad';
	import type { Article, Meta } from 'src/global';
	import { onMount } from 'svelte';

	const languageStore = getLanguageStore();
	const t = getTranslate();

	onMount(async () => {
		const observer = lozad(); // lazy loads elements with default selector as '.lozad'
		observer.observe();
	});

	export let articleI18n: { [key: string]: Article };
	export let meta: Meta;

	let article: Article;
	let onlyEs = articleI18n.en ? false : true;

	$: if (articleI18n[$languageStore]) {
		article = articleI18n[$languageStore];
	} else {
		article = articleI18n.es;
	}
</script>

<MetaApp {meta} />

<article class="content">
	<header class="px-4">
		<ImageApp
			src={article.cover.url}
			alt={article.cover.alternativeText}
			height="768"
			class="object-cover object-center w-full h-48 rounded-lg sm:h-80 md:h-96"
		/>
	</header>

	<section
		class="max-w-5xl px-4 mx-auto my-4 prose prose-blue border-b lg:prose-lg lg:w-screen-md "
	>
		<header class="mt-8 mb-10 text-center ">
			<h1 class="!mb-6 !text-2xl !font-extrabold !tracking-wider!sm:text-3xl !lg:text-4xl ">
				{article.title}
			</h1>

			<div class="flex justify-center">
				<div class="flex text-sm flex-wrap">
					<ArticleData
						title={$t({ key: 'article_collection_label' })}
						subtitle={article.collection.name}
					/>

					<ArticleData title={$t({ key: 'article_author_label' })} subtitle={article.writer.name} />

					<ArticleData
						title={$t({ key: 'article_date_label' })}
						subtitle={timeHumans(article.publishedAt, $languageStore)}
					/>

					<ArticleData
						title={$t({ key: 'article_time_label' })}
						subtitle={$t({
							key: 'article_time_to_read',
							parameters: { time: article.readingTime }
						})}
					/>
				</div>
			</div>

			{#if onlyEs}
				<p
					class="bg-yellow-300 text-yellow-900 p-1 rounded border border-yellow-600 dark:border-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
				>
					<T keyName="only_spanish_card" />
				</p>
			{/if}
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

		<div>
			{@html article.content}
		</div>
	</section>
</article>
