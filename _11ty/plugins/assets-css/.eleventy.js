import path from "node:path"
import browserslist from "browserslist";
import { bundle, browserslistToTargets } from "lightningcss";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.addTemplateFormats("css");

	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function (_inputContent, inputPath) {
			let input = path.basename(inputPath);

			let targets = browserslistToTargets(browserslist("> 0.5%, last 2 versions"));

			if (input != "index.css") {
				return;
			}

			return async () => {
				let { code } = bundle({
					filename: inputPath,
					minify: true,
					targets
				})
				// console.log(input);
				return code;
			};
		}
	});
};
