import fs from "fs";

export default {
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
