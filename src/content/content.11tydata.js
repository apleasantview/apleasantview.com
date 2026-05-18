import fs from "fs";

export default {
	permalink: function (data) {
		if (data.page.inputPath.includes('11tydata.js')) return false;
		const slug = data.slug ? this.slugify(data.slug) : data.page.fileSlug;
		const prefix = data.lang === 'en' ? '' : `/${data.lang}`;
		return `${prefix}/${slug}/`;
	},
	eleventyComputed: {
		page: {
			datePublished: (data) => {
				const stats = fs.statSync(data.page.inputPath);
				return stats.birthtimeMs;
			},
			dateModified: (data) => {
				const stats = fs.statSync(data.page.inputPath);
				return stats.ctimeMs;
			}
		}
	}
}
