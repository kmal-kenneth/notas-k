const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {},

		colors: {
			gray: {
				1000: '#21242B',
				900: '#282c34',
				800: '#43474e',
				700: '#5e6167',
				600: '#797b81',
				500: '#93959a',
				400: '#aeafb4',
				300: '#c8c9cd',
				200: '#e3e3e6',
				100: '#fdfdff'
			},
			pink: {
				1000: '#904158',
				900: '#f7567c',
				800: '#f86b8d',
				700: '#f9809d',
				600: '#fa95ae',
				500: '#faaabe',
				400: '#fbbfcf',
				300: '#fcd4df',
				200: '#fde9ef',
				100: '#fdf3f7'
			},
			blue: {
				900: '#3685b5',
				800: '#4f94bf',
				700: '#68a3c8',
				600: '#81b2d1',
				500: '#9ac1da',
				400: '#b3d0e4',
				300: '#ccdfed',
				200: '#e5eef6',
				100: '#f1f6fb'
			},
			teal: {
				900: '#0e7c7b',
				800: '#2c8d8c',
				700: '#4a9d9c',
				600: '#68adad',
				500: '#86bdbd',
				400: '#a4cdce',
				300: '#c2ddde',
				200: '#e0edef',
				100: '#eff5f7'
			},
			yellow: {
				900: '#f6e27f',
				800: '#f7e68f',
				700: '#f8e99f',
				600: '#f9edaf',
				500: '#faf0bf',
				400: '#fbf4cf',
				300: '#fcf7df',
				200: '#fdfaef',
				100: '#fdfcf7'
			}
		},

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

	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
