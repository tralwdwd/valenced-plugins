import { RootNavigationRef } from "@valenced/discord/modules/main_tabs_v2";
import { withHideActionSheet } from "./common";
import type { QuickAction } from "../../types";

const SettingsAction: QuickAction = {
	name: "Go To Settings",
	icon: "SettingsIcon",
	action() {
		withHideActionSheet(() => {
			const navigation = RootNavigationRef.getRootNavigationRef();

			navigation.navigate("settings");
		});
	},
};

export default SettingsAction;
