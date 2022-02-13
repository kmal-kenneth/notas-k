<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Fa from 'svelte-fa';
	import { faTimes } from '@fortawesome/free-solid-svg-icons';
	import { t } from '$lib/i18n';

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
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-nav" role="dialog" aria-modal="true" bind:this={modal} on:click={close}>
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
			<li>
				<a href="/" class="text-gray-900 no-underline dark:text-gray-100" on:click={close}
					>{$t('nav.inicio')}</a
				>
			</li>
		</ul>
	</nav>
</div>
