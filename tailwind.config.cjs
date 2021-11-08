const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			zIndex: {
				'-10': '-10',
				100: 100
			},
			fontFamily: {
				sans: [
					'"Source Sans Pro"',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"'
				],
				serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
				mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
			}
		}
	},
	variants: {
		extend: {
			boxShadow: ['active'],
			textColor: ['active'],
			fontWeight: ['active']
		}
	},
	plugins: []
};

module.exports = config;
