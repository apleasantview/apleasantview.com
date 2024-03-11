export default function (eleventyConfig) {
	eleventyConfig.addTemplateFormats("css");

	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function (_inputContent, inputPath) {
			let output = _inputContent;

			return async () => {
				return output;
			};
		}
	});
};
