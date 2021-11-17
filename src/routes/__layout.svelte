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

	let open = false;
	let innerWidth = 0;
	$: open = innerWidth >= 768 ? true : false;

	function openMenu() {
		if (innerWidth <= 768) {
			open = !open;
		}
	}
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

	<button class="md:hidden focus:outline-none focus:shadow-outline " on:click={openMenu}>
		{#if !open}
			abrir
		{/if}

		{#if open}
			cerrar
		{/if}
		<!-- <font-awesome-icon v-if="!open" :icon="['fas', 'bars']" /> -->
		<!-- <font-awesome-icon v-if="open" :icon="['fas', 'times']" /> -->
	</button>

	<MyNav {links} {open} buttonAction={openMenu} />
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
