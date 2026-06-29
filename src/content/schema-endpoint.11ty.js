// Schema endpoints: one per entry.type. Each emits a JSON-LD corpus document
// listing every page of that type as a WebPage entry, with the WebSite node
// included at the top for @id resolution.
//
// Paired with /schemamap.xml (which catalogues these endpoints) and the
// Schemamap: directive in robots.txt. Discovery surface for AI agents that
// consume structured data corpus-wide (NLWeb pattern).

import { LOCALE_REGION, WEBPAGE_TYPE_BY_TYPE } from '../../utils/seo-graph.js';
import { gitModified } from '../../utils/git-date.js';

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
	const { settings, _navigator, schemaType, collections } = data;
	const navigatorNodes = _navigator?.nodes || {};
	const siteUrlRaw = settings?.url || '';
	const siteUrl = siteUrlRaw.replace(/\/+$/, '');

	// Navigator nodes do not carry inputPath; join via collections.all by url
	// so we can resolve each entry's source file for a git-backed dateModified.
	const inputPathByUrl = {};
	for (const item of collections?.all || []) {
		if (item?.url && item?.inputPath) inputPathByUrl[item.url] = item.inputPath;
	}

	const entries = Object.values(navigatorNodes)
		.filter((node) => node?.type === schemaType)
		.map((node) => {
			const lang = node.lang;
			const inputPath = inputPathByUrl[node.url];
			return {
				'@type': WEBPAGE_TYPE_BY_TYPE[node.type] || 'WebPage',
				'@id': `${siteUrl}${node.url}#webpage`,
				url: `${siteUrl}${node.url}`,
				name: node.title,
				description: node.description,
				inLanguage: LOCALE_REGION[lang] || lang,
				...(inputPath ? { dateModified: gitModified(inputPath) } : {}),
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
