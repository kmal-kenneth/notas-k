<script lang="ts">
	import { ImageApp } from '$lib/components';

	export let src: string;
	export let alt: string;
</script>

<template lang="pug">
figure(class="my-8 flex flex-col items-center")
	ImageApp(src!="{src}", alt!="{alt}", width="1024", lazy, class="w-full rounded-lg")
	figcaption(class="text-center") {alt}
</template>
