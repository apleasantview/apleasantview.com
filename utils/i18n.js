import strings from '../src/_data/i18n/strings.json' with { type: 'json' };

export default {
	defaultLanguage: 'en',
	languages: {
		en: {
			contentDir: 'content/en/',
			locale: 'en-GB',
			languageName: 'English',
			title: 'a pleasant view',
			tagline: 'Digital Services for Amsterdam West & the Jordaan'
		},
		nl: {
			contentDir: 'content/nl/',
			locale: 'nl-NL',
			languageName: 'Nederlands',
			title: 'a pleasant view',
			tagline: 'Webdesign en ontwikkeling abonnementen.'
		},
		fr: {
			contentDir: 'content/fr/',
			locale: 'fr-FR',
			languageName: 'Français',
			title: 'a pleasant view',
			tagline: 'Design et développement de sites webs par abonnements.'
		}
	},
	strings
};
