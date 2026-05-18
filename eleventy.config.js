/* Site config */
import "dotenv/config";

import baseline, { config as baselineConfig } from "@apleasantview/eleventy-plugin-baseline";
import settings from "./src/_data/settings.js";
import i18n from "./utils/i18n.js";
import { translateKey } from "./utils/translate.js";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default async function (eleventyConfig) {
	await eleventyConfig.addPlugin(baseline(settings, {
		verbose: true,
		multilingual: true
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
