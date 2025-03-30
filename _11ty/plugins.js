import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import assetsPostCSS from "./plugins/assets-postcss/.eleventy.js";
import multilingual from "./plugins/feature-i18n/.eleventy.js";
import jsonLD from "./plugins/jsonld-generator/.eleventy.js";

export default {
	EleventyHtmlBasePlugin,
	assetsPostCSS,
	multilingual,
	jsonLD
}; 
