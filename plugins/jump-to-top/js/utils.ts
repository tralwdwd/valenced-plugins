import { MessageActionCreators } from "@shared/modules/actions";
import { ChannelRouter } from "@shared/modules/misc";

export function jumpToTop(details: {
	isDifferentChannel: boolean;
	channelId?: string;
	guildId?: string;
}) {
	if (details.isDifferentChannel) {
		ChannelRouter.transitionToChannel(details.channelId!);
	}

	MessageActionCreators.jumpToMessage({
		channelId: details.channelId,
		messageId: details.channelId,
		flash: true,
		jumpType: "ANIMATED",
	});
}
