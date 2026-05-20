// Schema endpoints: one per entry.type. Each emits a JSON-LD corpus document
// listing every page of that type as a WebPage entry, with the WebSite node
// included at the top for @id resolution.
//
// Paired with /schemamap.xml (which catalogues these endpoints) and the
// Schemamap: directive in robots.txt. Discovery surface for AI agents that
// consume structured data corpus-wide (NLWeb pattern).

import { LOCALE_REGION, WEBPAGE_TYPE_BY_TYPE } from '../../utils/seo-graph.js';

const TYPES = ['service', 'neighborhood', 'faq', 'page', 'about', 'contact'];

export const data = {
	pagination: {
		data: 'schemaTypes',
		size: 1,
		alias: 'schemaType'
	},
	schemaTypes: TYPES,
	permalink: ({ schemaType }) => `/schema/${schemaType}.json`,
	baselineExcludeFromGraph: true,
	eleventyExcludeFromCollections: true,
	_internal: true
};

export default function (data) {
	const { settings, _navigator, schemaType } = data;
	const navigatorNodes = _navigator?.nodes || {};
	const siteUrlRaw = settings?.url || '';
	const siteUrl = siteUrlRaw.replace(/\/+$/, '');

	const entries = Object.values(navigatorNodes)
		.filter((node) => node?.type === schemaType)
		.map((node) => {
			const lang = node.locale?.lang;
			return {
				'@type': WEBPAGE_TYPE_BY_TYPE[node.type] || 'WebPage',
				'@id': `${siteUrl}${node.url}#webpage`,
				url: `${siteUrl}${node.url}`,
				name: node.title,
				description: node.description,
				inLanguage: LOCALE_REGION[lang] || lang,
				isPartOf: { '@id': `${siteUrl}/#website` }
			};
		});

	const graph = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${siteUrl}/#website`,
				url: `${siteUrl}/`,
				name: settings?.title,
				publisher: { '@id': `${siteUrl}/#organization` }
			},
			...entries
		]
	};

	return JSON.stringify(graph, null, 2);
}
