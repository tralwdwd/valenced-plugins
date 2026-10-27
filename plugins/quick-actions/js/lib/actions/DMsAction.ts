import { GuildRouter } from "@shared/modules/misc";
import { withHideActionSheet } from "./common";
import type { QuickAction } from "../../types";

const DMsAction: QuickAction = {
	name: "Go To DMs",
	icon: "ChatIcon",
	action() {
		withHideActionSheet(() => GuildRouter.transitionTo("/@me"));
	},
};

export default DMsAction;