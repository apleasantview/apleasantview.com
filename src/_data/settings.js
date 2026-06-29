import strings from './i18n/strings.json' with { type: 'json' };

const FAVICONS = [
	{ rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
	{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
	{ rel: 'shortcut icon', type: 'image/svg+xml', href: '/favicon.ico' },
	{ rel: 'apple-touch-icon', type: 'image/png', href: '/apple-touch-icon.png', sizes: '180x180' }
];

export default {
	title: 'a pleasant view',
	tagline: 'Digital Services for Amsterdam West & the Jordaan',
	url: 'https://www.apleasantview.com/',
	defaultLanguage: 'en',
	defaultLocale: 'en-GB',
	noindex: false,

	// Site-wide OG/Twitter defaults for <baseline-head>. Object form emits a
	// dimensioned JSON-LD ImageObject alongside the og:image tag. Keep absolute.
	seo: {
		ogImage: {
			url: 'https://www.apleasantview.com/og.jpg',
			width: 1200,
			height: 630,
			alt: 'a pleasant view, digital services for Amsterdam-West and the Jordaan'
		}
	},

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
	strings,

	head: {
		link: [
			{ rel: 'stylesheet', href: '/assets/css/index.css' },
			{ rel: 'preload', href: '/assets/img/2-_FQp-yOr-1440.avif', as: 'image', fetchpriority: 'high' },
			{ rel: 'manifest', href: '/site.webmanifest' },
			{ rel: 'me', href: 'https://mastodon.social/@crisverstraeten' },
			...FAVICONS
		],
		script: [{ src: '/assets/js/index.js', defer: true }],
		meta: [{ name: 'color-scheme', content: 'light dark' }]
	}
};
