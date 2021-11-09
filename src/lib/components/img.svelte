<script lang="ts">
	import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
	import { Resize } from '@cloudinary/url-gen/actions/resize';
	import { blur } from '@cloudinary/url-gen/actions/effect';

	// Create your instance
	let cld = new Cloudinary({
		cloud: {
			cloudName: 'dsovqcsof'
		},
		url: {
			secure: true // force https, set to false to force http
		}
	});

	export let src: string;
	export let alt: string;
	export let height: string = '';
	export let width: string = '';
	let clazz: any;
	export { clazz as class };

	let image: CloudinaryImage;
	let placeholder: CloudinaryImage;
	let myURL: string;
	let placeholderURL: string;

	$: if (src) {
		let filename = src.substring(src.lastIndexOf('/') + 1);

		// Let's create a new image
		image = cld.image(filename);

		if (height || width) {
			let resize = Resize.fit();

			if (height) {
				resize = resize.height(height);
			}

			if (width) {
				resize = resize.width(width);
			}

			image.resize(resize).format('auto').quality('auto');
		} else {
			image.format('auto').quality('auto');
		}

		placeholder = cld.image(filename);
		placeholder.resize(Resize.fit().width(10)).effect(blur(2000)).format('auto').quality('auto');

		myURL = image.toURL();
		placeholderURL = placeholder.toURL();
	}
</script>

<img
	loading="lazy"
	decoding="async"
	src={myURL}
	{alt}
	{height}
	{width}
	class={`bg-cover ${clazz || ''}`}
	class:h-full={!height}
	class:w-full={!width}
	style="background-image: url({placeholderURL}); height: {height}; width: {width}"
/>
