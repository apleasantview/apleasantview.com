import postcssImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano"; // Import cssnano for minification

import "dotenv/config";
const isProd = process.env.ELEVENTY_ENV === "production" || false;

const additionalPlugins = [];

if (isProd) {
	additionalPlugins.push(
		postcssPresetEnv({
			features: {
				"is-pseudo-class": { preserve: true },
				"not-pseudo-class": false,
				"logical-viewport-units": false
			}
		}),
		cssnano);
}

const config = {
	plugins: [postcssImport, ...additionalPlugins],
	map: !isProd
};

export default config
