<script lang="ts">
	import '../app.css';

	import MyNav from '$lib/components/nav.svelte';

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

<header class="h-12 flex items-center justify-between px-4 ">
	<a href="/" class="logo">
		<div class="notas">notas</div>
		<div class="flex ">
			<div class="code">
				{'{'}
			</div>
			<div class="code">K</div>
			<div class="code">
				{'}'}
			</div>
		</div>
	</a>

	{#if !showMenu}
		<button class="md:hidden focus:outline-none focus:shadow-outline " on:click={openMenu}>
			abrir

			<!-- <font-awesome-icon v-if="!showMenu" :icon="['fas', 'bars']" /> -->
			<!-- <font-awesome-icon v-if="showMenu" :icon="['fas', 'times']" /> -->
		</button>
	{/if}

	{#if showMenu}
		<MyNav {links} on:close={openMenu} />
	{/if}
</header>

{innerWidth}

<main class="lg:px-4 z-0 min-h-full flex-grow">
	<slot />
</main>

<style lang="postcss">
	.logo {
		@apply flex items-center text-gray-900 dark:text-gray-100;

		.notas {
			@apply font-dancing text-3xl mr-1 font-bold;
		}

		.code {
			@apply flex font-victor font-bold text-3xl odd:text-pink-900 even:font-semibold;
		}
	}
</style>
