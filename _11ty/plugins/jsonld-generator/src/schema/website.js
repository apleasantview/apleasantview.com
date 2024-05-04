const baseSchema = {
	"@type": "WebSite",
	"@id": "https://www.example.com/#website",
	url: "https://www.example.com/",
	name: "Website name",
	publisher: "https://www.example.com/#organization"
}

export function orgSchema(userValues = {}) {
	return userValues;
}
