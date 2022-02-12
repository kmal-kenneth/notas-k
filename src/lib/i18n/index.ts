import i18n from 'sveltekit-i18n';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
	translations: {
		es: { lang },
		en: { lang }
	},
	loaders: [
		{
			locale: 'es',
			key: 'nav',
			routes: ['/'],
			loader: async () => (await import('./es/nav.json')).default
		},

		{
			locale: 'en',
			key: 'nav',
			routes: ['/'],
			loader: async () => (await import('./en/nav.json')).default
		}
	]
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
