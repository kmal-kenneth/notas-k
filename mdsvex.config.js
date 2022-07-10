const content = './src/content/layout/';

const config = {
	extensions: ['.svelte.md', '.svx'],
	layout: {
		article: content + 'article.svelte'
	},
	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: []
};

export default config;
