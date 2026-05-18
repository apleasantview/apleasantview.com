import fs from "fs";
import { buildSeoGraph, buildSeoMeta } from "../../utils/seo-graph.js";

export default {
	permalink: function (data) {
		if (data.page.inputPath.includes('11tydata.js')) return false;
		const slug = data.slug ? this.slugify(data.slug) : data.page.fileSlug;
		const prefix = data.lang === 'en' ? '' : `/${data.lang}`;
		return `${prefix}/${slug}/`;
	},
	eleventyComputed: {
		page: {
			// Publish date from front matter (Eleventy parses `date:` to a Date).
			datePublished: (data) => data.date,
			// Modified date from front matter override, else file mtime.
			dateModified: (data) => {
				if (data.dateModified) return data.dateModified;
				const stats = fs.statSync(data.page.inputPath);
				return stats.mtimeMs;
			}
		},
		head: {
			// JSON-LD graph emitted into <head> via Baseline's head.script merge.
			// buildSeoGraph reads _navigator.nodes for page identity + translation siblings.
			script: (data) => [
				{
					type: "application/ld+json",
					content: JSON.stringify(buildSeoGraph(data))
				}
			],
			// OG + Twitter meta. Same data sources as the graph so they cannot drift.
			meta: (data) => buildSeoMeta(data)
		}
	}
}
