import path from "node:path";
import postcss from "postcss";
import postcssConfig from "../../../../postcss.config.js";

/** 
 * @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function generateCSS(eleventyConfig) {
	eleventyConfig.addTemplateFormats("css");

	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function (_inputContent, inputPath) {
			let inputFile = path.basename(inputPath);

			if (inputFile !== "index.css") {
				return;
			}

			return async () => {
				let code = await postcss(postcssConfig.plugins).process(_inputContent, {
					from: inputPath,
					map: postcssConfig.map // Enable or disable source maps based on the parameter
				});

				return code.css;
			};
		}
	});
}
