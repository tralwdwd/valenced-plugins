import { patchActionSheet } from "./patches/actionsheet";
import { patchJumpToPresent } from "./patches/jumptopresentbutton";

export default plugin({
	start(api) {
		const { plugin } = api;

		if (plugin.startedLate) plugin.requireReload();

		patchJumpToPresent(api);
		patchActionSheet(api);
	},
});
