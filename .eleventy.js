import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import debug from "./_11ty/plugins/pdehaan-debug/.eleventy.js";
import assets from "./_11ty/plugins/assets-css/.eleventy.js";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {

	/* Plugins */
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
		baseHref: process.env.URL || "/"
	});

	eleventyConfig.addPlugin(debug);
	eleventyConfig.addPlugin(assets);

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
