// Eleventy
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

// Custom plugins
import assetsESBuild from "./plugins/assets-esbuild.js";
import assetsPostCSS from "./plugins/assets-postcss.js";
import multilingual from "./plugins/feature-i18n.js";

export default {
	EleventyHtmlBasePlugin,
	assetsESBuild,
	assetsPostCSS,
	multilingual
}; 
