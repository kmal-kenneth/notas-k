import { defineConfig } from 'windicss/helpers';
// import colors from 'windicss/colors';
// import plugin from 'windicss/plugin'
import typography from 'windicss/plugin/typography';
import aspectRatio from 'windicss/plugin/aspect-ratio';

export default defineConfig({
	extract: {
		include: ['./src/**/*.{html,js,svelte,ts}']
	},
	safelist: ['prose', 'prose-sm', 'm-auto'],
	darkMode: 'class',
	attributify: true,
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				gray: {
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
					900: '#42323d',
					800: '#703b4d',
					700: '#9d445d',
					600: '#ca4d6d',
					500: '#f7567c',
					400: '#f97b99',
					300: '#faa0b6',
					200: '#fcc5d3',
					100: '#FDE9EF'
				},
				blue: {
					900: '#2a3845',
					800: '#2c4355',
					700: '#2f5975',
					600: '#336f95',
					500: '#3685b5',
					400: '#68a3c8',
					300: '#9ac1da',
					200: '#ccdfed',
					100: '#e5eef6'
				},
				teal: {
					900: '#25363d',
					800: '#224046',
					700: '#1b5458',
					600: '#15686a',
					500: '#0e7c7b',
					400: '#4a9d9c',
					300: '#86bdbd',
					200: '#c2ddde',
					100: '#e0edef'
				},
				yellow: {
					900: '#42433e',
					800: '#5c5a47',
					700: '#8f875a',
					600: '#c3b56d',
					500: '#f6e27f',
					400: '#f8e99f',
					300: '#faf0bf',
					200: '#fcf7df',
					100: '#fdfaef'
				},
				zIndex: {
					'-10': '-10',
					100: 100
				}
			}
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
	},
	plugins: [
		typography({
			dark: true
			// modifiers: ['DEFAULT', 'sm', 'lg', 'red']
		}),
		aspectRatio
	]
});
