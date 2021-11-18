import { Renderer } from '@ts-stack/markdown';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions/resize';
import { blur } from '@cloudinary/url-gen/actions/effect';

export class MyRenderer extends Renderer {
	// Overriding parent method.
	image(href: string, title: string, text: string): string {
		// Create your instance
		const cld = new Cloudinary({
			cloud: {
				cloudName: 'dsovqcsof'
			},
			url: {
				secure: true // force https, set to false to force http
			}
		});

		let image: CloudinaryImage;
		let placeholder: CloudinaryImage;

		if (href) {
			const filename = href.substring(href.lastIndexOf('/') + 1);

			// Let's create a new image
			image = cld.image(filename);

			image.format('auto').quality('auto');

			placeholder = cld.image(filename);
			placeholder.resize(Resize.fit().width(10)).effect(blur(2000)).format('auto').quality('auto');
		}

		// When we're done, we can apply all our changes and create a URL.
		const myURL = href ? image.toURL() : null;
		const placeholderURL = href ? placeholder.toURL() : null;

		return `
        <figure class="my-8 flex flex-col items-center">
            <img
            loading="lazy"
            decoding="async"
            src="${myURL}"
            alt="${text}"
			width="1024"
            class="bg-cover w-full rounded-lg"
            style="background-image: url(${placeholderURL}); width: 1024; "
            />

            <figcaption class="text-center">
                ${text}
            </figcaption>
        </figure>
        `;
	}
}
