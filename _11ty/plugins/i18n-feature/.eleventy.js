/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig, options = {}) {
	let config = {
		defaultLanguage: "en",
		languages: {
			en: {
				contentDir: "",
				languageCode: "",
				languageDirection: "",
				languageName: "",
				title: "",
			}
		},
		...options
	}

	eleventyConfig.addCollection("languages", function(collection) {
		const site = eleventyConfig.globalData.site;

		const localeCodes = Object.keys(site.i18n.languages);
		const byLocale = {};
	
		if (!collection) {
			console.error("Collection API is not available.");
			return [];
		}
	
		localeCodes.forEach(item => {
			byLocale[item] = [];
		})
	
		collection.getAll().forEach(item => {
			if (item.data.locale && localeCodes.includes(item.data.locale)) {
				byLocale[item.data.locale].push(item);
			}
		});

		return byLocale;
	});
	let extensionMap;
	eleventyConfig.on("eleventy.extensionmap", (map) => {
		extensionMap = map;
	});
	// console.log(extensionMap);
}
