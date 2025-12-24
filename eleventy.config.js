/* Site config */
import "dotenv/config";

import baseline, { config as baselineConfig } from "@apleasantview/eleventy-plugin-baseline";
import i18n from "./src/_data/i18n.js";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.addPlugin(baseline({
		multilingual: true,
		defaultLanguage: i18n.defaultLanguage,
		languages: i18n.languages
	}));

	eleventyConfig.addPassthroughCopy("./src/assets/img/");
}

export const config = baselineConfig;
