<script context="module" lang="ts">
	import { NavbarApp } from '$lib/components';
	import { loadTranslations, locale } from '$lib/i18n';
	import SvelteTheme from '$lib/mode/SvelteTheme.svelte';
	import type { Load } from '@sveltejs/kit';
	import '../app.css';

	/** @type {import('@sveltejs/kit').Load} */
	export const load: Load = async ({ url }) => {
		const { pathname } = url;

		const defaultLocale = 'es'; // get from cookie, user session, ...

		const initLocale = locale.get() || defaultLocale; // set default if no locale already set

		await loadTranslations(initLocale, pathname);

		return {};
	};
</script>

<script lang="ts">
	let year = new Date().getFullYear();
</script>

<SvelteTheme attribute="class" />

<div class="min-h-screen flex flex-col justify-between">
	<div>
		<NavbarApp />

		<main class="container  mx-auto">
			<slot />
		</main>
	</div>

	<footer class="px-4 mt-12 container  mx-auto">
		<p class="py-2 text-xs text-gray-800 dark:text-gray-200">
			Copyright © {year} notas {'{K}'}
		</p>
	</footer>
</div>
