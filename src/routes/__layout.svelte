<script context="module" lang="ts">
	import { NavbarApp } from '$lib/components';
	import SvelteTheme from '$lib/mode/SvelteTheme.svelte';
	import type { Load } from '@sveltejs/kit';
	import '../app.css';

	/** @type {import('@sveltejs/kit').Load} */
	export const load: Load = async () => {
		return {};
	};
</script>

<script lang="ts">
	import { TolgeeProvider } from '@tolgee/svelte';
	import type { TolgeeConfig } from '@tolgee/core';
	import esLang from '../i18n/es.json';
	import enLang from '../i18n/en.json';

	const tolgeeConfig = {
		apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
		apiKey: import.meta.env.VITE_TOLGEE_API_KEY,
		// remove this to enable language auto detection
		// enableLanguageDetection: false,
		staticData: {
			es: esLang,
			en: enLang
		},
		availableLanguages: ['en', 'es'],
		ui: import.meta.env.VITE_TOLGEE_API_KEY ? import('@tolgee/ui') : undefined
	} as TolgeeConfig;

	let year = new Date().getFullYear();
</script>

<SvelteTheme attribute="class" />

<TolgeeProvider config={tolgeeConfig}>
	<div slot="loading-fallback">Loading...</div>

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
</TolgeeProvider>
