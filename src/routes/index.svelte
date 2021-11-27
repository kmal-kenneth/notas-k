<script lang="ts" context="module">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page: { path }, fetch }) => {
		const res = await fetch(`/index.graphql`);

		if (!res.ok) {
			return { status: res.status };
		}

		const data = await res.json();
		const { article, articles, baner } = data;

		const metadata: PageMetadata = data.metadata || {};

		const meta: Meta = {
			title: `${metadata.title}`,
			description: metadata.description,
			url: `${import.meta.env.VITE_WEBSITE_URL}${path}`,
			image: metadata.image.url,
			lenguage: 'es',
			canonical: `${import.meta.env.VITE_WEBSITE_URL}${path}`,
			robots: 'index, follow'
		};

		return {
			props: {
				article: article,
				articles: articles,
				metadata: meta,
				baner: baner
			}
		};
	};
</script>

<script lang="ts">
	import { PrimaryCardArticle, GridApp, CardArticle, MetaApp, ImageApp } from '$lib/components';

	export let article: Article;
	export let articles: Article[];
	export let metadata: Meta;
	export let baner: Image;
</script>

<MetaApp meta={metadata} />

<div class="flex flex-wrap px-4 py-16 bg-teal-900">
	<ImageApp
		src={baner.url}
		alt={baner.alternativeText}
		height="384"
		class="object-cover object-center w-full rounded-lg h-44 sm:h-72 md:h-96 lg:w-8/12"
	/>

	<div class="flex flex-col justify-center flex-1 text-base text-gray-100 lg:pl-4">
		<h1
			class="my-2 overflow-hidden text-lg font-semibold tracking-normal text-gray-100 overflow-ellipsis "
		>
			Anotamos hoy para el mañana
		</h1>
		<p class="mb-2 overflow-hidden overflow-ellipsis">
			En busca del crecimiento personal y profesional, el desarrollo de la personalidad y el auto
			aprendizaje.
		</p>
		<p class="mb-2 overflow-hidden overflow-ellipsis">
			Realizamos una serie de articulos que te ayudaran a mejorar tu comprención en diversos temas.
		</p>
		<p class="overflow-hidden overflow-ellipsis">
			De la mano de nuestros autores, te invitamos a leer y compartir sus experiencias.
		</p>
	</div>
</div>

<section class="px-4">
	<div class="mt-10 mb-16">
		<PrimaryCardArticle {article} />
	</div>

	<GridApp>
		{#each articles as article}
			<CardArticle {article} />
		{/each}
	</GridApp>
</section>
