import { Stores } from "@shared/utils";
import { getAssetIdByName } from "@valenced/assets";
import { ActionSheetActionCreators } from "@valenced/discord/actions";
import { Design } from "@valenced/discord/design";
import { ChannelType } from "@vencord/discord-types/enums";
import { UpsideDown } from "../ui/components/UpsideDown";
import { jumpToTop } from "../utils";
import type { PluginApi } from "@valenced/plugins/types";
import type { Channel } from "@vencord/discord-types";

type ChannelLongPressProps = {
	channelId: string;
};

type ForumPostLongPressProps = {
	thread: Channel;
};

const allowedChannelTypes = [
	ChannelType.GUILD_TEXT,
	ChannelType.DM,
	ChannelType.GUILD_VOICE,
	ChannelType.GROUP_DM,
	ChannelType.GUILD_ANNOUNCEMENT,
	ChannelType.GUILD_STORE,
	ChannelType.ANNOUNCEMENT_THREAD,
	ChannelType.PUBLIC_THREAD,
	ChannelType.PRIVATE_THREAD,
];

export function patchActionSheet({ cleanup, unscoped }: PluginApi) {
	const { ActionSheetPatcher } = unscoped.tralwdwdd;

	cleanup(
		ActionSheetPatcher.registerActionSheetPatch<ChannelLongPressProps>(
			/^ChannelLongPress/,
			(tree, props) => {
				const { ChannelStore } = Stores;
				const { id: channelId, type } = ChannelStore.getChannel(
					props.channelId,
				);

				if (!allowedChannelTypes.includes(type)) return;

				tree.unshift(
					<Design.ActionSheetRow.Group hasIcons>
						<Design.ActionSheetRow
							label="Jump To Top"
							icon={
								<UpsideDown>
									<Design.ActionSheetRow.Icon
										source={getAssetIdByName("ArrowLargeDownIcon")!}
									/>
								</UpsideDown>
							}
							onPress={() => {
								jumpToTop({
									isDifferentChannel: true,
									channelId,
								});

								ActionSheetActionCreators.hideActionSheet();
							}}
						/>
					</Design.ActionSheetRow.Group>,
				);
			},
		),
		ActionSheetPatcher.registerActionSheetPatch<ForumPostLongPressProps>(
			"ForumPostLongPressActionSheet",
			(tree, props) => {
				const { guild_id: guildId, id: threadId } = props.thread;

				tree.unshift(
					<Design.ActionSheetRow.Group hasIcons>
						<Design.ActionSheetRow
							label="Jump To Top"
							icon={
								<UpsideDown>
									<Design.ActionSheetRow.Icon
										source={getAssetIdByName("ArrowLargeDownIcon")!}
									/>
								</UpsideDown>
							}
							onPress={() => {
								jumpToTop({
									isDifferentChannel: false,
									channelId: threadId,
									guildId,
								});

								ActionSheetActionCreators.hideActionSheet();
							}}
						/>
					</Design.ActionSheetRow.Group>,
				);
			},
		),
		ActionSheetPatcher.registerActionSheetPatch<ChannelLongPressProps>(
			"ThreadLongPressActionSheet",
			(tree, props) => {
				const { ChannelStore } = Stores;
                const { id: channelId, type } = ChannelStore.getChannel(
					props.channelId,
				);

				if (!allowedChannelTypes.includes(type)) return;

				tree.unshift(
					<Design.ActionSheetRow.Group hasIcons>
						<Design.ActionSheetRow
							label="Jump To Top"
							icon={
								<UpsideDown>
									<Design.ActionSheetRow.Icon
										source={getAssetIdByName("ArrowLargeDownIcon")!}
									/>
								</UpsideDown>
							}
							onPress={() => {
								jumpToTop({
									isDifferentChannel: true,
									channelId,
								});

								ActionSheetActionCreators.hideActionSheet();
							}}
						/>
					</Design.ActionSheetRow.Group>,
				);
			},
		),
	);
}
