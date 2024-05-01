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
				description: ""
			}
		},
		...options
	}

	eleventyConfig.addGlobalData("i18n", config);

	eleventyConfig.addCollection("translations", function (collection) {
		const allPages = collection.getAll();
		const translations = {};

		allPages.forEach(page => {
			if (page.data.translationKey) {
				const translationKey = page.data.translationKey;
				const language = page.data.locale;
				const url = page.url;
				const title = page.data.title;

				if (!translations[translationKey]) {
					translations[translationKey] = [];
				}
				translations[translationKey].push({
					title: title,
					language: language,
					url: url
				});
			}
		});

		return translations;
	});

	let extensionMap;
	eleventyConfig.on("eleventy.extensionmap", (map) => {
		extensionMap = map;
	});
	// console.log(extensionMap);
}
