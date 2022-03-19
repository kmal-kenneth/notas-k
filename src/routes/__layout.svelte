<script context="module" lang="ts">
	import { ColorMode, LogoApp, NavApp } from '$lib/components';
	import { loadTranslations, locale, locales, t } from '$lib/i18n';
	import themeStore from '$lib/mode/index';
	import SvelteTheme from '$lib/mode/SvelteTheme.svelte';
	import { faBars } from '@fortawesome/free-solid-svg-icons';
	import type { Load } from '@sveltejs/kit';
	import Fa from 'svelte-fa';
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

	let showMenu = false;
	let innerWidth = 0;
	$: showMenu = innerWidth >= 768 ? true : false;

	const openMenu = () => {
		if (innerWidth <= 768) {
			showMenu = !showMenu;
		}
	};
</script>

<svelte:window bind:innerWidth />

<SvelteTheme attribute="class" />

<div class="container flex flex-col justify-between min-h-screen mx-auto  ">
	<div>
		<header class="flex items-center justify-between w-full h-12 px-4">
			<LogoApp />

			{#if !showMenu}
				<button
					class="text-2xl text-gray-800 transition-all duration-300 dark:text-gray-200 md:hidden focus:outline-none focus:shadow-outline hover:text-pink-800"
					on:click={openMenu}
					type="button"
					aria-label="Abrir menú de navegación"
				>
					<Fa icon={faBars} />
				</button>
			{/if}

			{#if showMenu}
				<NavApp on:close={openMenu} />
			{/if}

			<select bind:value={$locale}>
				{#each $locales as value}
					<option {value}>{$t(`lang.${value}`)}</option>
				{/each}
			</select>

			<ColorMode />
		</header>

		<main class="min-h-full">
			<slot />
		</main>
	</div>

	<footer class="px-4 mt-12">
		<div>
			{#if !showMenu}
				<div class="flex justify-center">
					<button
						class="text-2xl text-gray-800 transition-all duration-300 dark:text-gray-200 md:hidden focus:outline-none focus:shadow-outline hover:text-pink-800"
						on:click={openMenu}
						type="button"
						aria-label="Abrir menú de navegación"
					>
						<Fa icon={faBars} />
					</button>
				</div>
			{/if}

			{#if showMenu}
				<NavApp on:close={openMenu} />
			{/if}
		</div>
		<p class="py-2 text-xs text-gray-800 dark:text-gray-200">
			Copyright © {year} notas {'{K}'}
		</p>
	</footer>
</div>
