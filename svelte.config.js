import WindiCSS from 'vite-plugin-windicss';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			pug: true
		})
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		vite: {
			build: {
				rollupOptions: {
					output: {
						manualChunks: undefined
					}
				}
			},
			plugins: [WindiCSS()]
		}
	}
};

export default config;
