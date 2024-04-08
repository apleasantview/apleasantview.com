import { site } from "./_11ty/site.js";

import debug from "./_11ty/plugins/pdehaan-debug/.eleventy.js";
import assets from "./_11ty/plugins/assets-css/.eleventy.js";
import international from "./_11ty/plugins/i18n-feature/.eleventy.js";
import sitemap from "./_11ty/plugins/sitemap-generator/.eleventy.js";

import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.addGlobalData("site", site);

	/* Plugins */
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
		baseHref: process.env.URL || "/"
	});

	eleventyConfig.addPlugin(debug);
	eleventyConfig.addPlugin(assets);
	eleventyConfig.addPlugin(international);
	eleventyConfig.addPlugin(sitemap);

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
