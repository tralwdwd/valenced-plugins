import { ActionSheetActionCreators } from "@valenced/discord/actions";
import { RootNavigationRef } from "@valenced/discord/modules/main_tabs_v2";
import { RouteNames, withHideActionSheet } from "./common";
import type { QuickAction } from "../../types";

const PluginsAction: QuickAction = {
	name: "Go To Plugins",
	icon: "PuzzlePieceIcon",
	action() {
		withHideActionSheet(() => {
			const navigation = RootNavigationRef.getRootNavigationRef();

			navigation.navigate("settings", {
				screen: RouteNames.ValencedPlugins,
			});
			ActionSheetActionCreators.hideActionSheet();
		});
	},
};

export default PluginsAction;
