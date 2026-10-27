import { reloadApp } from "@valenced/modules/native/app";
import type { QuickAction } from "../../types";

const ReloadAppAction: QuickAction = {
	name: "Reload App",
	icon: "RetryIcon",
	action() {
		reloadApp();
	},
};

export default ReloadAppAction;
