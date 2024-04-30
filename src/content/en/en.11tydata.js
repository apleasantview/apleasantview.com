import fs from "fs";

export default {
	locale: "en",
	eleventyComputed: {
		datePublished: (data) => {
			const stats = fs.statSync(data.page.inputPath);
			return stats.birthtime;
		},
		dateModified: (data) => {
			const stats = fs.statSync(data.page.inputPath);
			return stats.ctime;
		}
	}
}
