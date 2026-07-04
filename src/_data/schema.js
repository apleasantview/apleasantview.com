// Authored SEO identity, read by Baseline's <baseline-head> graph builder.
// Cascade key: schema (`schema.organization`, `schema.person`).
// Site-wide OG/Twitter defaults (ogImage) live in settings.seo, not here.
// Null fields are dropped from the emitted graph.

// The graph builder derives these @ids itself (Org slug = slugify(name),
// Person keyed on person.url). We reference them to cross-link founder/worksFor.
// Keep in sync if organization.name or person.url changes.
const ORG_ID = 'https://www.apleasantview.com/#/schema.org/Organization/a-pleasant-view';
const PERSON_ID = 'https://www.apleasantview.com/about/#/schema.org/Person';

export default {
	organization: {
		'@type': 'LocalBusiness',
		name: 'a pleasant view',
		legalName: 'a pleasant view',
		url: 'https://www.apleasantview.com/',
		email: 'hello@apleasantview.com',
		telephone: null,
		address: {
			'@type': 'PostalAddress',
			streetAddress: null,
			postalCode: null,
			addressLocality: 'Amsterdam',
			addressRegion: 'Noord-Holland',
			addressCountry: 'NL'
		},
		// GeoCircle, not a point: expresses coverage without pinning the (private) address.
		geo: {
			'@type': 'GeoCircle',
			geoMidpoint: { '@type': 'GeoCoordinates', latitude: 52.3776, longitude: 4.8768 },
			geoRadius: 3000
		},
		areaServed: ['Amsterdam-West', 'Jordaan', 'Oud-West', 'De Baarsjes', 'Westerpark', 'Bos en Lommer'],
		taxID: '60532955', // KvK
		vatID: 'NL002490124B31',
		foundingDate: '2009',
		logo: {
			url: 'https://www.apleasantview.com/web-app-manifest-512x512.png',
			width: 512,
			height: 512
		},
		sameAs: [
			'https://www.linkedin.com/company/apleasantview',
			'https://github.com/apleasantview',
			'https://mastodon.social/@crisverstraeten',
			'https://www.eleventy-baseline.dev/'
		],
		knowsAbout: ['Web design', 'Website maintenance', 'Eleventy', 'Static site hosting', 'Small-business IT support'],
		slogan: null, // null = fall back to site.tagline per language
		founder: { '@id': PERSON_ID }
	},

	person: {
		'@type': 'Person',
		name: 'Cristovao Verstraeten',
		givenName: 'Cristovao',
		familyName: 'Verstraeten',
		url: 'https://www.apleasantview.com/about/',
		email: null,
		image: null,
		jobTitle: 'Independent web and IT services',
		sameAs: [
			'https://mastodon.social/@crisverstraeten',
			'https://github.com/cristovaov',
			'https://www.linkedin.com/in/cristovaoverstraeten/'
		],
		worksFor: { '@id': ORG_ID }
	}
};
