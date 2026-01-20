/* Site config */
import "dotenv/config";

import baseline, { config as baselineConfig } from "@apleasantview/eleventy-plugin-baseline";
import i18n from "./src/_data/i18n.js";
import { translateKey } from "./utils/translate.js";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.addPlugin(baseline({
		multilingual: true,
		defaultLanguage: i18n.defaultLanguage,
		languages: i18n.languages
	}));

	eleventyConfig.addFilter("translate", function (key, params = {}) {
		const ctx = this.ctx || {};

		const strings =
			ctx.i18n?.strings ||
			ctx.strings ||
			i18n?.strings ||
			{};

		const resolvedLang =
			params.lang ||
			ctx.lang ||
			ctx.page?.lang ||
			ctx.site?.defaultLanguage;

		const resolvedFallback =
			params.fallback ||
			ctx.site?.defaultLanguage ||
			i18n?.defaultLanguage;

		return translateKey(key, {
			strings,
			lang: resolvedLang,
			fallback: resolvedFallback,
			params
		});
	});

	eleventyConfig.addPassthroughCopy("./src/assets/img/");
}

export const config = baselineConfig;
