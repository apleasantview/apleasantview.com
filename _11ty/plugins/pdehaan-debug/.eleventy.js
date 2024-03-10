import { inspect } from 'util';

/* https://github.com/pdehaan/eleventy-plugin-debug */
export default function (eleventyConfig, options = {}) {
  options = {
    space: 0,
    ...options
  };

  eleventyConfig.addFilter('inspect', inspect);
  eleventyConfig.addFilter('json', (obj, space = options.space) => JSON.stringify(obj, null, space));
  eleventyConfig.addFilter('keys', obj => Object.keys(obj).sort());
};
