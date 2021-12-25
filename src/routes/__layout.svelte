<script lang="ts">
	import '../app.css';
	import Fa from 'svelte-fa';
	import { faBars } from '@fortawesome/free-solid-svg-icons';

	import MyNav from '$lib/components/nav.svelte';
	import MyLogo from '$lib/components/logo.svelte';

	const links: Link[] = [
		{
			text: 'Home',
			href: '/'
		}
	];

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

<div class="container flex flex-col justify-between min-h-screen mx-auto ">
	<div>
		<header class="flex items-center justify-between w-full h-12 px-4">
			<MyLogo />

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
				<MyNav {links} on:close={openMenu} />
			{/if}
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
				<MyNav {links} on:close={openMenu} />
			{/if}
		</div>
		<p class="py-2 text-xs text-gray-800 dark:text-gray-200">Copyright © 2021 notas {'{K}'}</p>
	</footer>
</div>
