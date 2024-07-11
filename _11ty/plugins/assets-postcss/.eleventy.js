import generateCSS from "./plugin-generate/generateCSS.js";
import inlineCSS from "./filter-inline/inlineCSS.js";

const assetsPostCSS = {
	generateCSS,
	inlineCSS
}

export default assetsPostCSS
