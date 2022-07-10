<script lang="ts">
	import { onMount } from 'svelte';

	export let component;

	let Comp;
	onMount(async () => {
		Comp = (await import(`./../../../content/es/${component}.svx`)).default;
	});
</script>

<!-- <template lang="pug">
	p hola
	p {JSON.stringify( articleI18n)}
</template> -->

<svelte:component this={Comp} />
