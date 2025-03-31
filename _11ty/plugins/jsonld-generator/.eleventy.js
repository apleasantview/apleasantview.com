/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.addGlobalData("eleventyComputed.page._schema", async () => {
		return (data) => {
			let websiteURL = data.site.baseURL;
			let websiteDescription = data.site.description;

			if (!data.eleventyExcludeFromCollections && data.language !== data.site.defaultLanguage) {
				websiteURL = websiteURL + data.language + "/"
			}

			const jsonLdData = {
				"@context": "http://schema.org",
				"@graph": [
					{
						"@type": ["Organization", "Brand"],
						"@id": "https://www.apleasantview.com/#organization",
						"name": "a pleasant view",
						"url": "https://www.apleasantview.com/",
						"description": "Website services for entrepreneurs and SMBs.",
						"foundingDate": "2014-05-01",
						"slogan": "Have a pleasant view",
						"legalName": "a pleasant view",
						"sameAs": [
							"https://www.linkedin.com/company/apleasantview/",
							"https://github.com/apleasantview/",
							"https://twitter.com/apleasantview/",
							"https://www.facebook.com/apleasantview/"
						],
						"numberOfEmployees": 1,
						"founder": {
							"@type": "Person",
							"name": "Cristovao Verstraeten",
							"url": "https://www.apleasantview.com/",
							"sameAs": [
								"https://www.linkedin.com/in/cverstraeten/",
								"https://github.com/cristovaov/"
							],
							"knowsLanguage": ["en", "nl", "fr"],
						}
					},
					{
						"@type": "WebSite",
						"@id": `${websiteURL}#website`,
						"url": websiteURL,
						"name": "a pleasant view",
						"description": websiteDescription,
						"publisher": {
							"@id": "https://www.apleasantview.com/#organization"
						},
						"inLanguage": data.language,
						"copyrightHolder": {
							"@id": "https://www.apleasantview.com/#organization"
						}
					},
					{
						"@type": "WebPage",
						"@id": data.page.url,
						"url": data.page.url,
						"name": data.title,
						"description": data.description,
						"isPartOf": {
							"@id": `${websiteURL}#website`
						},
						"datePublished": data.date || new Date().toISOString(),
						"dateModified": data.date || new Date().toISOString(),
						"inLanguage": data.language
					}
				]
			};
			return jsonLdData;
		}
	});

	eleventyConfig.addShortcode("generateJSONLD", function (data) {
		// Get the computed schema data
		const schemaData = this.page._schema;
		if (!schemaData) {
			console.warn("No schema data found for page:", this.page.url);
			return "";
		}
		
		// Ensure we have a function to get the data
		if (typeof schemaData === "function") {
			const jsonLdData = schemaData(data);
			const jsonLDStringified = JSON.stringify(jsonLdData);
			return `<script class="jsonld-generator" type="application/ld+json">${jsonLDStringified}</script>`;
		}
		
		// If we already have the data object
		const jsonLDStringified = JSON.stringify(schemaData);
		return `<script class="jsonld-generator" type="application/ld+json">${jsonLDStringified}</script>`;
	});
}
