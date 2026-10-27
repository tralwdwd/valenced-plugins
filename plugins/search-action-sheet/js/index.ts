import { patchSearchRowList } from "./patches/searchrowlist";

export default plugin({
	start(api) {
		patchSearchRowList(api);
	},
});
