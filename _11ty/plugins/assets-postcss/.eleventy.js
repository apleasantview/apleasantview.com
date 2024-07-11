import path from "node:path";
import postcss from "postcss";
import postcssImport from "postcss-import";
import cssnano from "cssnano"; // Import cssnano for minification
import postcssConfig from "../../../postcss.config.js";

/** 
 * @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig 
 * @param { Object } options - Options for configuring the CSS processing
 * @param { Array } options.additionalPlugins - Optional additional PostCSS plugins
 * @param { Boolean } options.enableSourceMaps - Whether to enable source maps, defaults to false
 * @param { Boolean } options.minify - Whether to minify the CSS output, defaults to false
 */
export default function (eleventyConfig, options = {}) {
	const {
		additionalPlugins = [],
		enableSourceMaps = false,
		minify = true
	} = options;

	eleventyConfig.addTemplateFormats("css");

	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function (_inputContent, inputPath) {
			let inputFile = path.basename(inputPath);

			if (inputFile !== "index.css") {
				return;
			}

			return async () => {
				let plugins = [postcssImport, ...additionalPlugins];

				if (minify) {
					plugins.push(cssnano()); // Add cssnano for minification if minify is true
				}

				let code = await postcss(postcssConfig.plugins).process(_inputContent, {
					from: inputPath,
					map: postcssConfig.map // Enable or disable source maps based on the parameter
				});

				return code.css;
			};
		}
	});
}
