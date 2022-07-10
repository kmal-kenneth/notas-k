<script lang="ts">
	import { ColorMode, LangSelector, LogoApp } from '$lib/components';
	import { T } from '@tolgee/svelte';

	let showMenu = false;

	function toggleNavbar() {
		showMenu = !showMenu;
	}

	function closeNavbar() {
		showMenu = false;
	}
</script>

<nav
	class=" top-0 flex  z-50  bg-gray-100   dark:bg-gray-900 dark:shadow-gray-800 {showMenu
		? 'fixed h-full w-full '
		: 'sticky items-center h-12 shadow mb-10'}"
>
	<div
		class="container flex flex-col lg:flex-row items-start lg:items-center justify-between mx-auto "
	>
		<div class="flex justify-between w-full px-4 lg:w-auto py-1 h-12">
			<LogoApp />

			<button
				class=" flex justify-center items-center py-1 px-2 text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
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

		<div class="lg:flex lg:items-center flex-grow lg:flex-grow-0 {showMenu ? 'flex' : 'hidden'}">
			<ul class="flex flex-col px-4 list-none lg:items-center lg:flex-row">
				<li class="nav-item ">
					<a href="/" on:click={closeNavbar}> <T keyName="navbar_home" /> </a>
				</li>

				<li class="px-3 py-2">
					<LangSelector />
				</li>

				<li class="px-3 py-2">
					<ColorMode />
				</li>
			</ul>
		</div>
	</div>
</nav>
