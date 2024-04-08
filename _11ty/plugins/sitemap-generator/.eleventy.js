// import fs from "node:fs";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	const settings = eleventyConfig.globalData.site.sitemap;

	eleventyConfig.on("eleventy.after", async ({ dir, results }) => {
    // Read more below
		// console.log(dir);
		// console.log(results);
		return;
  });
	console.log(settings);
	return;
}
