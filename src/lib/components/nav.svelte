<script lang="ts">
	import { prefetch, prefetchRoutes } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		prefetchRoutes();
	});

	export let links: Link[] = [
		{
			text: 'Home',
			href: '/'
		},
		{
			text: 'Blog',
			href: '/blog/1'
		}
	];

	export let open = false;
	export let buttonAction;
</script>

<div
	class="flex flex-col items-center modal"
	class:flex={open}
	class:hidden={!open}
	class:bg-pink-500={open}
>
	<div class="button">
		<button class=" focus:outline-none focus:shadow-outline " on:click={buttonAction}>
			{#if !open}
				abrir
			{/if}

			{#if open}
				cerrar
			{/if}
			<!-- <font-awesome-icon v-if="!open" :icon="['fas', 'bars']" /> -->
			<!-- <font-awesome-icon v-if="open" :icon="['fas', 'times']" /> -->
		</button>
	</div>

	<nav class="menu ">
		<ul>
			{#each links as item}
				<li>
					<a sveltekit:prefetch href={item.href} on:click={buttonAction}>{item.text}</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style lang="postcss">
	.modal {
		@apply absolute top-0 left-0 w-screen h-screen px-4 bg-gray-100 dark:bg-gray-900 md:relative md:w-auto  md:h-12 md:px-0 md:bg-opacity-0;

		.button {
			@apply md:hidden flex justify-end h-12 w-full;
		}

		.menu {
			@apply flex flex-col items-center justify-center w-full h-full;

			ul {
				@apply flex flex-col justify-center items-center text-xl md:text-base md:flex-row;
			}

			li {
				@apply mb-2 last:mb-0 md:mb-0 md:mr-2 last:mr-0 hover:border-b-2 hover:border-pink-900 transition-all duration-300;
			}
		}
	}
</style>
