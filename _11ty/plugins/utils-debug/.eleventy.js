import { inspect } from 'util';

/* https://github.com/pdehaan/eleventy-plugin-debug */
export default function (eleventyConfig, options = {}) {
	options = {
		space: 0,
		...options
	};

	eleventyConfig.addFilter('inspect', obj => inspect(obj));
	eleventyConfig.addFilter('keys', obj => Object.keys(obj).sort());
};
