// SEO graph data for partials/seo-graph.njk and OG/Twitter fallbacks.
// Cascade key: seo (`seo.organization`, `seo.person`, `seo.shareImage`).
// Null fields are dropped from the emitted graph.

export default {
	organization: {
		"@type": "LocalBusiness",
		name: "a pleasant view",
		legalName: null, // TODO: registered KvK name if different
		url: "https://www.apleasantview.com/",
		email: "hello@apleasantview.com",
		telephone: null,
		address: {
			streetAddress: null,
			postalCode: null,
			addressLocality: "Amsterdam",
			addressRegion: "Noord-Holland",
			addressCountry: "NL",
		},
		geo: null, // { latitude, longitude } or null
		areaServed: ["Amsterdam-West", "Jordaan"],
		taxID: "60532955", // KvK
		vatID: null,
		foundingDate: null, // "YYYY-MM-DD"
		logo: {
			url: "https://www.apleasantview.com/web-app-manifest-512x512.png",
			width: 512,
			height: 512,
		},
		sameAs: [
			"https://mastodon.social/@crisverstraeten",
			"https://github.com/apleasantview",
			"https://www.linkedin.com/company/apleasantview",
			"https://www.eleventy-baseline.dev/",
		],
		knowsAbout: [
			"Web design",
			"Website maintenance",
			"Eleventy",
			"Static site hosting",
			"Small-business IT support",
		],
		slogan: null, // null = fall back to site.tagline per language
	},

	person: {
		"@type": "Person",
		name: "Cristovao Verstraeten",
		givenName: "Cristovao",
		familyName: "Verstraeten",
		url: "https://www.apleasantview.com/about/",
		email: null,
		image: null,
		jobTitle: "Independent web and IT services",
		sameAs: [
			"https://mastodon.social/@crisverstraeten",
			"https://github.com/cristovaov",
			"https://www.linkedin.com/in/cristovaoverstraeten/",
		],
		// worksFor wired by the partial via @id reference
	},

	shareImage: {
		// OG and Twitter card fallback
		url: "https://www.apleasantview.com/og.jpg",
		width: 1200,
		height: 630,
		alt: "a pleasant view, digital services for Amsterdam-West and the Jordaan",
	},
};
