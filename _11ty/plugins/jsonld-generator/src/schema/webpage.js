const baseSchema = {
	"@type": "WebPage",
	"@id": "https://www.example.com/example-page/test/",
	"url": "https://www.example.com/example-page/test/",
	"name": "Example page name",
	"description": "Example page description",
	"isPartOf": {
		"@id": "https://www.example.com/#website"
	}
}

export function orgSchema(userValues = {}) {
	return userValues;
}
