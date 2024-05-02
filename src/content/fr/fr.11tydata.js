import fs from "fs";

export default {
	language: "fr",
	eleventyComputed: {
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
