import ActionSheetPatcher, { patchActionSheet } from "./patches/actionsheet";

export default plugin({
	start({ cleanup, decorate }) {
		patchActionSheet(cleanup);

		decorate(plugin => {
			plugin.api.unscoped.tralwdwdd = {
				ActionSheetPatcher,
			};
		});
	},
});

type TralwdwddLibrary = {
	ActionSheetPatcher: typeof ActionSheetPatcher;
};

declare module "@valenced/plugins/types" {
	interface UnscopedPluginApi {
		tralwdwdd: TralwdwddLibrary;
	}
}
