/* Site config */
import "dotenv/config";
import i18n from "./src/_data/i18n.js"

/* Filters */
import { dateISO } from "./_11ty/filters/date.js";

/* Plugins */
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

import debug from "./_11ty/plugins/utils-debug/.eleventy.js";
import assetsPostCSS from "./_11ty/plugins/assets-postcss/.eleventy.js";
import multilingual from "./_11ty/plugins/feature-i18n/.eleventy.js";
import jsonLD from "./_11ty/plugins/jsonld-generator/.eleventy.js";

/* PostCSS plugins */
import postcssPresetEnv from "postcss-preset-env";

const isProd = process.env.ELEVENTY_ENV === "production" || false;

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	/* Filters */
	eleventyConfig.addFilter("dateISO", dateISO);

	/* Plugins */
	eleventyConfig.addPlugin(debug);
	eleventyConfig.addPlugin(assetsPostCSS, {
		additionalPlugins: [postcssPresetEnv({
			features: {
				"is-pseudo-class": {preserve: true},
				"not-pseudo-class": false,
				"logical-viewport-units": false
			}
		})],
		enableSourceMaps: !isProd,
		minify: isProd
	});

	eleventyConfig.addPlugin(multilingual, {
		defaultLanguage: i18n.defaultLanguage,
		languages: i18n.languages
	});

	eleventyConfig.addPlugin(jsonLD, {});

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
		baseHref: process.env.URL || "/"
	});

	eleventyConfig.addPassthroughCopy("./src/assets/img/");

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
