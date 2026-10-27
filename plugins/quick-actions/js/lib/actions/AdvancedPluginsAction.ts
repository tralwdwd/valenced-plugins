import { RootNavigationRef } from "@valenced/discord/modules/main_tabs_v2";
import { RouteNames, withHideActionSheet } from "./common";
import type { QuickAction } from "../../types";

const AdvancedPluginsAction: QuickAction = {
	name: "Go To Advanced Plugin Settings",
	icon: "SettingsIcon",
	action() {
		withHideActionSheet(() => {
			const navigation = RootNavigationRef.getRootNavigationRef();

			navigation.navigate("settings", {
				screen: RouteNames.ValencedAdvancedPlugins,
			});
		});
	},
};

export default AdvancedPluginsAction;
