/* Site config */
import "dotenv/config";

import debug from "./_11ty/debug.js";
import filters from "./_11ty/filters.js";
import plugins from "./_11ty/plugins.js";

import i18n from "./src/_data/i18n.js";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	// Debug filters.
	eleventyConfig.addFilter("inspect", debug.inspect);
	eleventyConfig.addFilter("json", debug.json);
	eleventyConfig.addFilter("keys", debug.keys);

	// Filters.
	eleventyConfig.addFilter("dateISO", filters.dateISO);
	eleventyConfig.addFilter("inlinePostCSS", filters.inlinePostCSS);

	// Passthrough copy.
	eleventyConfig.addPassthroughCopy({"./src/static": "/"});
	eleventyConfig.addPassthroughCopy("./src/assets/img/");

	// Plugins.
	eleventyConfig.addPlugin(plugins.assetsESBuild);
	eleventyConfig.addPlugin(plugins.assetsPostCSS);
	eleventyConfig.addPlugin(plugins.multilingual, {
		defaultLanguage: i18n.defaultLanguage,
		languages: i18n.languages
	});

	eleventyConfig.addPlugin(plugins.EleventyHtmlBasePlugin, {
		baseHref: process.env.URL || "/"
	});

	// Watch target.
	eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');

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
