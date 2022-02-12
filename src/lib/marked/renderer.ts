import { Renderer } from '@ts-stack/markdown';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions/resize';
import { blur } from '@cloudinary/url-gen/actions/effect';

export class MyRenderer extends Renderer {
	// Overriding parent method.
	image(href: string, title: string, text: string): string {
		const sizes = [1536, 1280, 1024, 768, 640, 320];
		const imagesSizes = [320, 640, 960, 1280, 1920, 2560];

		/**
		 * Get the image url from the href
		 * Use the cloudinary url generator to generate the url
		 * Defaults size is 10 and the image is blurred for placeholder
		 * @param {string} href
		 * @param {number} width - the width of the image, defaults to 10
		 * @returns {string} - the url of the image
		 */
		function getImage(href: string, width = 10): string {
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

			if (href) {
				const filename = href.substring(href.lastIndexOf('/') + 1);

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
		const myURL = getImage(href, 1024);
		const placeholderURL = getImage(href);

		const newSizes = sizes.map((size) => `(min-width: ${size}px) ${size}px`).join(', ') + ', 100vw';
		const newSrcset = imagesSizes
			.map((size) => {
				const src = getImage(href, size);
				return `${src} ${size}w`;
			})
			.join(', ');

		return `
        <figure class="my-8 flex flex-col items-center">
            <img
            loading="lazy"
            decoding="async"
			src="${placeholderURL}"
            data-src="${myURL}"
			data-srcset="${newSrcset}"
            alt="${text}"
			width="1024"
			sizes="${newSizes}"
            class="w-full rounded-lg lozad "
            style=" width: 1024; "
            />

            <figcaption class="text-center">
                ${text}
            </figcaption>
        </figure>
        `;
	}
}
