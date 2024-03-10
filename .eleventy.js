/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	return {
		dir: {
			input: "src",
			output: "dist",
			data: "_data",
			includes: "_includes"
		},
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md"]
	}
};
