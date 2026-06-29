// Lookup tables read by the schema endpoints. Lifted verbatim from the (now
// archived) seo-graph.js when the custom SEO layer was unplugged.

export const LOCALE_REGION = {
	en: 'en-GB',
	nl: 'nl-NL',
	fr: 'fr-FR'
};

// Maps entry.type to schema.org WebPage subtype. Falls back to plain WebPage.
export const WEBPAGE_TYPE_BY_TYPE = {
	about: 'AboutPage',
	contact: 'ContactPage',
	faq: 'FAQPage'
};
