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
		},
		{
			text: 'Blog',
			href: '/blog/1'
		},
		{
			text: 'Proyectos Personales',
			href: '/blog/1'
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

<div class="container px-4 mx-auto">
	<header class="flex items-center justify-between w-full h-12 ">
		<MyLogo />

		{#if !showMenu}
			<button
				class="text-2xl text-gray-800 transition-all duration-300 dark:text-gray-200 md:hidden focus:outline-none focus:shadow-outline hover:text-pink-800"
				on:click={openMenu}
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

	<footer class="mt-12">
		<div>
			{#if !showMenu}
				<div class="flex justify-center">
					<button
						class="text-2xl text-gray-800 transition-all duration-300 dark:text-gray-200 md:hidden focus:outline-none focus:shadow-outline hover:text-pink-800"
						on:click={openMenu}
					>
						<Fa icon={faBars} />
					</button>
				</div>
			{/if}

			{#if showMenu}
				<MyNav {links} on:close={openMenu} />
			{/if}
		</div>
		<p class="my-4 text-xs text-gray-800 dark:text-gray-200">Copyright © 2021 notas {'{K}'}</p>
	</footer>
</div>
