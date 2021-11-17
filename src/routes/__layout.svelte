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

<div class="flex flex-col items-center">
	<header class="flex items-center justify-between w-full h-12 px-4 max-w-screen-2xl">
		<MyLogo />

		{#if !showMenu}
			<button
				class="text-2xl text-gray-200 transition-all duration-300 md:hidden focus:outline-none focus:shadow-outline hover:text-pink-800"
				on:click={openMenu}
			>
				<Fa icon={faBars} />
			</button>
		{/if}

		{#if showMenu}
			<MyNav {links} on:close={openMenu} />
		{/if}
	</header>

	{innerWidth}

	<main class="min-h-full px-4 max-w-screen-2xl">
		<slot />
	</main>
</div>
