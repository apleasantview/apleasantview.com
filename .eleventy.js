import debug from "./_11ty/plugins/pdehaan-debug/.eleventy.js";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.addTemplateFormats("css");
	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function (_inputContent, inputPath) {
			let output = _inputContent;

			return async () => {
				return output;
			};
		}
	});

	/* Plugins */
	eleventyConfig.addPlugin(debug);

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
