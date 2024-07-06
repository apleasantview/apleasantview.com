/* Site config */
import "dotenv/config";
import { site } from "./_11ty/site.js";

/* Filters */
import { dateISO } from "./_11ty/filters/date.js";

/* Plugins */
import debug from "./_11ty/plugins/debug-utils/.eleventy.js";
import assetsPostCSS from "./_11ty/plugins/assets-postcss/.eleventy.js";
import multilingual from "./_11ty/plugins/i18n-feature/.eleventy.js";
import jsonLD from "./_11ty/plugins/jsonld-generator/.eleventy.js";

import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

const isProd = process.env.ELEVENTY_ENV === "production" || false;

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.addGlobalData("site", site);

	/* Filters */
	eleventyConfig.addFilter("dateISO", dateISO);

	/* Plugins */
	eleventyConfig.addPlugin(debug);
	eleventyConfig.addPlugin(assetsPostCSS, {
		enableSourceMaps: !isProd
	});

	eleventyConfig.addPlugin(multilingual, {
		defaultLanguage: site.defaultLanguage,
		languages: site.languages
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
