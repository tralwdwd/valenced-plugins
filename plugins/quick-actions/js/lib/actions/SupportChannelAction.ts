import { ChannelRouter } from "@shared/modules/misc";
import { Stores } from "@shared/utils";
import { ToastActionCreators } from "@valenced/discord/actions";
import { lookupGeneratedIconComponent } from "@valenced/utils/discord";
import { proxify } from "@valenced/utils/proxy";
import { VALENCED_SERVER_ID, VALENCED_SUPPORT_CHANNEL_ID } from "../constants";
import { withHideActionSheet } from "./common";
import type { QuickAction } from "../../types";

const CircleXIcon = proxify(() => lookupGeneratedIconComponent("CircleXIcon"));

const SupportChannelAction: QuickAction = {
	name: "Go To Support Channel",
	icon: "CircleQuestionIcon",
	action() {
		withHideActionSheet(() => {
			const { GuildStore } = Stores;

			if (GuildStore.getGuild(VALENCED_SERVER_ID) == null) {
				ToastActionCreators.open("not-in-valenced-server", {
					text: "You are not in the Valenced server!",
					icon: CircleXIcon,
				});

				return;
			}

			ChannelRouter.transitionToChannel(VALENCED_SUPPORT_CHANNEL_ID);
		});
	},
};

export default SupportChannelAction;
