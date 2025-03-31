// Eleventy
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

// Custom plugins
import assetsPostCSS from "./plugins/assets-postcss.js";
import multilingual from "./plugins/feature-i18n/.eleventy.js";

export default {
	EleventyHtmlBasePlugin,
	assetsPostCSS,
	multilingual
}; 
