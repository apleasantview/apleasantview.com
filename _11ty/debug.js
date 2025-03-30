import { inspect } from "node:util";

export default {
	inspect: (obj) => inspect(obj),
	json: (obj) => JSON.stringify(obj),
	keys: (obj) => Object.keys(obj).sort()
}; 
