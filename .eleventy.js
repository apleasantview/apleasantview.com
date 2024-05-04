/* Site config */
import { site } from "./_11ty/site.js";
import { i18n } from "./_11ty/i18n.js";

/* Filters */
import { dateISO } from "./_11ty/filters/date.js";

/* Plugins */
import debug from "./_11ty/plugins/debug-utils/.eleventy.js";
import assets from "./_11ty/plugins/assets-css/.eleventy.js";
import multilingual from "./_11ty/plugins/i18n-feature/.eleventy.js";
import jsonLD from "./_11ty/plugins/jsonld-generator/.eleventy.js";
// import sitemap from "./_11ty/plugins/sitemap-generator/.eleventy.js";

import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.addGlobalData("site", site);

	/* Filters */
	eleventyConfig.addFilter("dateISO", dateISO);

	/* Plugins */
	eleventyConfig.addPlugin(debug);
	eleventyConfig.addPlugin(assets);
	eleventyConfig.addPlugin(multilingual, i18n);
	eleventyConfig.addPlugin(jsonLD, {});
	// eleventyConfig.addPlugin(sitemap);

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
		baseHref: process.env.URL || "/"
	});


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
