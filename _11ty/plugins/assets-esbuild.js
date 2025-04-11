import path from "node:path";
import * as esbuild from "esbuild";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function assetsESBuild(eleventyConfig) {
	// Only add js as a template format for files in assets/js
	eleventyConfig.addTemplateFormats("js");

	eleventyConfig.addExtension("js", {
		outputFileExtension: "js",
		compile: async function (_inputContent, inputPath) {
			// Only process files in assets/js directory
			if (!inputPath.startsWith("./src/assets/js/") ||
				path.basename(inputPath) !== "index.js") {
				return;
			}

			return async () => {
				let result = await esbuild.build({
					entryPoints: [inputPath],
					bundle: true,
					minify: true,
					target: "es2020",
					write: false
				});

				return result.outputFiles[0].text;
			}
		}
	});

	// Override the default collection behavior. Adding js as template format and extension collects 11tydata.js files.
	eleventyConfig.addCollection("all", function (collectionApi) {
		return collectionApi.getAll().filter(item => {
			// Skip 11tydata.js files
			if (item.inputPath.endsWith('11tydata.js')) {
				return false;
			}

			return true;
		});
	});
};
