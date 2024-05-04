import { DateTime } from "luxon";

const dateISO = function (date) {
	const jsDate = new Date(date);
	const dt = DateTime.fromJSDate(jsDate);
	return dt.toISO();
};

/** @param { import("@11ty/eleventy/src/UserConfig.js").default } eleventyConfig */
export default function (eleventyConfig, options = {}) {
	eleventyConfig.addGlobalData("eleventyComputed.page._schema", () => {
		return (data) => {
			let websiteURL = "https://www.apleasantview.com/";
			if (data.language !== "en") {
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
						"description": "Website subscriptions",
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
						"datePublished": dateISO(data.page.datePublished),
						"dateModified": dateISO(data.page.dateModified),
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

			// Convert JSON data to string
			const jsonLdScript = `<script class="jsonld-generator" type="application/ld+json">${JSON.stringify(jsonLdData)}</script>`;

			// Inject JSON-LD markup into the content
			const injectedMarkup = `${jsonLdScript}</head>`;

			// Return the modified content
			return content.replace("</head>", injectedMarkup);
		}
		// Return unmodified content for other file types
		return content;
	});
}
