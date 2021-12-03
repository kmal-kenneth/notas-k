<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Fa from 'svelte-fa';
	import { faTimes } from '@fortawesome/free-solid-svg-icons';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modal;

	const handle_keydown = (e) => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable: any[] = Array.from(nodes).filter((n: any) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused: any = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}

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
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal" role="dialog" aria-modal="true" bind:this={modal} on:click={close}>
	<div class="button">
		<!-- svelte-ignore a11y-autofocus -->
		<button
			class="mx-4 text-2xl text-gray-800 transition-all duration-300 dark:text-gray-200 md:hidden focus:outline-none focus:shadow-outline hover:text-pink-800"
			autofocus
			type="button"
			aria-label="Cerrar menú de navegación"
			on:click={close}><Fa icon={faTimes} /></button
		>
	</div>

	<nav class=" menu">
		<ul>
			{#each links as item}
				<li>
					<a
						sveltekit:prefetch
						href={item.href}
						class="text-gray-900 no-underline dark:text-gray-100"
						on:click={close}>{item.text}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style lang="postcss">
	.modal {
		@apply fixed top-0 left-0 w-screen h-screen p-4 flex flex-col items-center
		 bg-gray-100 bg-opacity-80 backdrop-filter backdrop-blur-sm 
		 dark:bg-gray-900 dark:bg-opacity-80 
		 md:relative md:w-auto  md:h-12 md:px-0 md:bg-opacity-10
		 transition-all duration-300;

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
