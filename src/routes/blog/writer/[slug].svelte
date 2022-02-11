<script lang="ts" context="module">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch, url }) => {
		const { slug } = params;

		const res = await fetch(`/blog/writer/${slug}.graphql`);

		if (!res.ok) {
			return { status: res.status };
		}

		const { writer } = await res.json();

		const meta: Meta = {
			title: `${writer.name} | notas {K}`,
			description: writer.biography,
			url: `${import.meta.env.VITE_WEBSITE_URL}${url.pathname}`,
			image: writer.cover.url,
			lenguage: 'es',
			canonical: `${import.meta.env.VITE_WEBSITE_URL}${url.pathname}`,
			robots: 'index, follow'
		};

		return { props: { writer: writer, meta: meta } };
	};
</script>

<script lang="ts">
	import { ImageApp, MetaApp } from '$lib/components/';
	import type { Meta, Writer } from 'src/global';

	export let writer: Writer;
	export let meta: Meta;
</script>

<MetaApp {meta} />

<section class="px-4">
	<ImageApp
		src={writer.cover.url}
		alt={writer.cover.alternativeText}
		height="768"
		class="object-cover object-center w-full h-48 rounded-lg sm:h-80 md:h-96"
	/>

	<div class="py-8 text-center">
		<ImageApp
			src={writer.photo.url}
			alt={writer.photo.alternativeText}
			height="256"
			width="256"
			class="object-cover object-center w-24 h-24 mx-auto rounded-full md:h-32 md:w-32"
		/>

		<h2 class="mt-4 mb-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
			{writer.name}
		</h2>
		<p class="font-sans sm:text-xl">{writer.biography}</p>
	</div>
</section>
