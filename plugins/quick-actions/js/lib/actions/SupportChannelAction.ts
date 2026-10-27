import { ChannelRouter } from "@shared/modules/misc";
import { ToastActionCreators } from "@valenced/discord/actions";
import { Stores } from "@valenced/discord/flux";
import { lookupGeneratedIconComponent } from "@valenced/utils/discord";
import { proxify } from "@valenced/utils/proxy";
import { VALENCED_SERVER_ID, VALENCED_SUPPORT_CHANNEL_ID } from "../constants";
import { withHideActionSheet } from "./common";
import type { GuildStore } from "@vencord/discord-types";
import type { ToValencedStore } from "@/types/util";
import type { QuickAction } from "../../types";

const CircleXIcon = proxify(() => lookupGeneratedIconComponent("CircleXIcon"));

const SupportChannelAction: QuickAction = {
	name: "Go To Support Channel",
	icon: "CircleQuestionIcon",
	action() {
		withHideActionSheet(() => {
			const GuildStore = Stores.GuildStore as ToValencedStore<GuildStore>;

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
