import { applyBaseToUrl } from "@11ty/eleventy/src/Plugins/HtmlBasePlugin.js";
import DateGitFirstAdded from "@11ty/eleventy/src/Util/DateGitFirstAdded.js";
import DateGitLastUpdated from "@11ty/eleventy/src/Util/DateGitLastUpdated.js";

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig, options = {}) {
	eleventyConfig.addGlobalData("eleventyComputed.page._schema", async () => {
		return (data) => {
			// console.log(data);
			let websiteURL = data.site.baseURL;
			let websiteDescription = data.site.description;
			let inputForGitDate = data.page.inputPath;

			
			if (!data.eleventyExcludeFromCollections && data.language !== data.site.defaultLanguage) {
				websiteURL = websiteURL + data.language + "/"
				// websiteDescription = data.i18n.languages[data.language].description;
				// console.log(data.page.inputPath);
				// console.log(data.language);
			}

			const jsonLdData = {
				"@context": "http://schema.org",
				"@graph": [
					{
						"@type": ["Organization", "Brand"],
						"@id": "https://www.apleasantview.com/#organization",
						"name": "a pleasant view",
						"url": "https://www.apleasantview.com/",
						"description": "Website subscriptions for entrepreneurs and SMBs.",
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
						"@id": applyBaseToUrl(data.page.url, websiteURL, {}),
						"url": applyBaseToUrl(data.page.url, websiteURL, {}),
						"name": data.title,
						"description": data.description,
						"isPartOf": {
							"@id": `${websiteURL}#website`
						},
						"datePublished": DateGitFirstAdded(inputForGitDate),
						"dateModified": DateGitLastUpdated(inputForGitDate),
						"inLanguage": data.language
					}
				]
			};
			// console.log(Object.keys(data.page));
			return jsonLdData;
		}
	});

	eleventyConfig.addTransform("injectJsonLd", function (content, outputPath) {
		// Check if the output path is an HTML file
		if (outputPath && outputPath.endsWith(".html")) {
			// Define your JSON-LD data
			const jsonLdData = this.page._schema;
			const jsonLDStringified = JSON.stringify(jsonLdData);

			// Convert JSON data to string
			const jsonLdScript = `<script class="jsonld-generator" type="application/ld+json">${jsonLDStringified}</script>`;

			// Inject JSON-LD markup into the content
			const injectedMarkup = `${jsonLdScript}</head>`;

			// Return the modified content
			return content.replace("</head>", injectedMarkup);
		}
		// Return unmodified content for other file types
		return content;
	});
}
