<script lang="ts">
	import { ColorMode, LogoApp } from '$lib/components';
	import { loadTranslations, locale, locales, t } from '$lib/i18n';

	let showMenu = false;

	function toggleNavbar() {
		showMenu = !showMenu;
	}
</script>

<nav class="sticky top-0 flex items-center py-1 mb-10 bg-gray-100 shadow h-min dark:bg-gray-900">
	<div class="container flex flex-wrap items-center justify-between mx-auto">
		<div class="flex justify-between w-full px-4 lg:w-auto ">
			<LogoApp />

			<button
				class="block py-1 pl-3 text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
				type="button"
				aria-label="Cerrar menú de navegación"
				on:click={toggleNavbar}
			>
				{#if showMenu}
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/></svg
					>
				{:else}
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				{/if}
			</button>
		</div>

		<div class="lg:flex lg:flex-grow items-center {showMenu ? 'flex' : 'hidden'}">
			<ul class="flex flex-col px-4 ml-auto list-none lg:items-center lg:flex-row">
				<li class="nav-item ">
					<a href="/">
						{$t('nav.inicio')}
					</a>
				</li>

				<li class="px-3 py-2">
					<select bind:value={$locale}>
						{#each $locales as value}
							<option {value}>{$t(`lang.${value}`)}</option>
						{/each}
					</select>
				</li>

				<li class="px-3 py-2">
					<ColorMode />
				</li>
			</ul>
		</div>
	</div>
</nav>
