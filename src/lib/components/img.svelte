<script lang="ts">
	import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
	import { Resize } from '@cloudinary/url-gen/actions/resize';
	import { blur } from '@cloudinary/url-gen/actions/effect';
	import lozad from 'lozad';
	import { onMount } from 'svelte';

	onMount(async () => {
		const observer = lozad(); // lazy loads elements with default selector as '.lozad'
		observer.observe();
	});

	export let src: string;
	export let alt: string;
	export let height: string = '';
	export let width: string = '';
	let clazz: any;
	export { clazz as class };

	const sizes = [1536, 1280, 1024, 768, 640, 320];
	const imagesSizes = [320, 640, 960, 1280, 1920, 2560];

	/**
	 * Get the image url from the src
	 * Use the cloudinary url generator to generate the url
	 * Defaults size is 10 and the image is blurred for placeholder
	 * @param {string} src
	 * @param {number} width - the width of the image, defaults to 10
	 * @returns {string} - the url of the image
	 */
	function getImage(src: string, width = 10): string {
		// Create your instance
		const cld = new Cloudinary({
			cloud: {
				cloudName: `${import.meta.env.VITE_CLOUDINARY_NAME}`
			},
			url: {
				secure: true // force https, set to false to force http
			}
		});

		let image: CloudinaryImage;

		if (src) {
			const filename = src.substring(src.lastIndexOf('/') + 1);

			// Let's create a new image
			image = cld.image(filename);

			const resize = Resize.fit().width(width);

			if (width <= 10) {
				image.resize(Resize.fit().width(10)).effect(blur(100)).format('auto').quality('auto');
			} else {
				image.resize(resize).format('auto').quality('auto');
			}

			return image.toURL();
		}

		return null;
	}

	// When we're done, we can apply all our changes and create a URL.
	const myURL = getImage(src, 1024);
	const placeholderURL = getImage(src);

	const newSizes = sizes.map((size) => `(min-width: ${size}px) ${size}px`).join(', ') + ', 100vw';
	const newSrcset = imagesSizes
		.map((size) => {
			const href = getImage(src, size);
			return `${href} ${size}w`;
		})
		.join(', ');
</script>

<img
	src={placeholderURL}
	data-src={myURL}
	data-srcset={newSrcset}
	sizes={newSizes}
	{alt}
	{height}
	{width}
	class={`lozad ${clazz || ''}`}
/>
