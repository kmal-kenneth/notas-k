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

	export let articleI18n;
	export let meta;

	let article: Article;

	$: if (articleI18n[$locale]) {
		article = articleI18n[$locale];
	} else {
		article = articleI18n.es;
	}
</script>

<MetaApp {meta} />

<article>
	<section class="px-4">
		<ImageApp
			src={article.cover.url}
			alt={article.cover.alternativeText}
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
			{article.readingTime} min read &nbsp;&middot;&nbsp;
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
					{@html article.content}
				</div>
			</section>
		</div>
	</section>
</article>

<style lang="postcss" global>
	.content {
		@apply font-open;

		p,
		span:not(.token),
		li {
			@apply tracking-wider leading-relaxed font-normal text-base;
		}

		p {
			@apply mb-4;
		}

		strong {
			@apply font-bold;
		}

		ol {
			@apply list-decimal ml-5 my-5;
		}

		ul {
			@apply list-disc ml-5 my-5;
		}

		a {
			@apply text-pink-1000 dark:text-pink-700;
		}

		li {
			ul,
			ol {
				@apply mt-0;
			}

			a {
				line-height: 48px;
			}
		}

		.contains-task-list {
			@apply list-none ml-0;
			.task-list-item > input[type='checkbox'] {
				@apply h-4 w-4  mr-2 leading-tight;
			}
		}

		pre {
			@apply w-full my-4 mx-auto py-8 px-4 rounded-lg shadow-lg bg-gray-900 dark:bg-gray-1000 text-gray-200 dark:text-gray-100;

			code {
				@apply whitespace-pre-wrap break-words font-victor;
				word-spacing: normal;
				tab-size: 4;
				hyphens: none;
			}
		}

		:not(pre) > code {
			@apply p-1 text-pink-1000 text-base break-words bg-pink-100 dark:bg-pink-1000 dark:text-pink-100 rounded-md font-victor;
		}

		h1 {
			@apply text-3xl font-bold  mt-6 mb-2;
		}

		h2 {
			@apply text-2xl font-bold mt-6 mb-2;
		}

		h3 {
			@apply text-xl font-bold mt-6 mb-2;
		}

		h4 {
			@apply text-lg font-bold mt-6 mb-2;
		}

		h5 {
			@apply text-base font-bold mt-6 mb-2;
		}

		h6 {
			@apply text-sm font-bold mt-6 mb-2;
		}

		table {
			@apply my-6 w-full table-auto rounded-t-lg overflow-hidden;

			thead {
				@apply text-gray-100 bg-pink-1000;
				@apply text-left text-sm font-medium;
				tr {
					th {
						@apply py-2 px-1;
					}
				}
			}

			tbody {
				@apply text-left text-base font-normal;

				tr {
					@apply p-1 border-b border-gray-200 dark:border-gray-700 hover:bg-pink-700 hover:text-gray-100;
				}
			}
		}

		blockquote {
			@apply my-6 w-full pl-4 border-l-4 italic border-pink-800;
		}
	}
</style>
