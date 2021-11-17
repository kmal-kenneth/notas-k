<script lang="ts">
	import CImage from '$lib/components/img.svelte';

	export let title: string = '';
	export let subtitle: string = '';
	export let src: string = '';
	export let alt: string = '';
	export let opacity: number = 50;
	export let blur: boolean = false;
</script>

<section>
	{#if !src}
		<div class="text-center py-10 md:py-20 px-4 max-w-screen-2xl bg-gray-50 dark:bg-gray-900 ">
			{#if title}
				<h2 class="h1 font-extrabold text-gray-700 dark:text-gray-400">
					{title}
				</h2>
			{/if}
			{#if subtitle}
				<p class="text-gray-600 text-light font-sans">
					{subtitle}
				</p>
			{/if}
		</div>
	{/if}

	{#if src}
		<div class="z-50 relative mt-0 h-auto">
			<CImage {src} {alt} class="w-full h-full object-cover object-center absolute -z-10" />

			<div class="w-full h-full" class:blur>
				<slot>
					<div
						class="text-center text-white lg:py-48 md:py-32 py-24 "
						style="--tw-bg-opacity: {opacity};"
					>
						{#if title}
							<h2 class="h1 font-extrabold">{{ title }}</h2>
						{/if}

						{#if subtitle}
							<p class="h5 font-sans">{{ subtitle }}</p>
						{/if}
					</div>
				</slot>
			</div>
		</div>
	{/if}
</section>

<style lang="postcss">
	.blur {
		@apply bg-gray-900 border bg-opacity-10  backdrop-filter backdrop-blur-sm;
	}
</style>
