import { once } from "@shared/utils";
import { getAssetIdByName } from "@valenced/assets";
import { Design } from "@valenced/discord/design";
import { Stores } from "@valenced/discord/flux";
import { getModuleWithImportedPath } from "@valenced/discord/utils/modules/finders";
import { getModules } from "@valenced/modules/finders";
import { withName } from "@valenced/modules/finders/filters";
import { instead } from "@valenced/patcher";
import { ChannelType } from "@vencord/discord-types/enums";
import { JumpToTopButton } from "../ui/components/JumpToTopButton";
import type { PluginApi, PluginCleanupApi } from "@valenced/plugins/types";
import type { ChannelStore } from "@vencord/discord-types";
import type { ToValencedStore } from "@/types/util";

export function patchJumpToPresent({ cleanup }: PluginApi) {
	cleanup(
		getModules(
			withName("JumpToPresentButton"),
			JTPButton => patch(JTPButton, cleanup),
			{
				returnNamespace: true,
			},
		),
		getModuleWithImportedPath<object>(
			"components_native/chat/JumpToPresentButton.tsx",
			JTPButton => patch(JTPButton, cleanup),
		),
	);
}

const patch = once((JTPButton: any, cleanup: PluginCleanupApi) => {
	const ChannelStore = Stores.ChannelStore as ToValencedStore<ChannelStore>;

	cleanup(
		instead(JTPButton, "default", ([props], original) => {
			const ret = original(
				props,
			) as React.ReactElement<React.PropsWithChildren>;

			if (ret == null) return null;

			const JumpToPresentButton = ret.props.children as React.ReactElement;

			if (!isJumpToPresentButton(JumpToPresentButton)) return ret;

			const { type: channelType } = ChannelStore.getChannel(props.channelId);

			// Voice channel text counts as different channel
			const isNotCurrentChannel = channelType === ChannelType.GUILD_VOICE;

			ret.props.children = (
				<Design.Stack>
					<JumpToTopButton
						JumpToPresentButton={JumpToPresentButton}
						channelId={props.channelId}
						isDifferentChannel={isNotCurrentChannel}
					/>
					{JumpToPresentButton}
				</Design.Stack>
			);

			return ret;
		}),
	);
});

function isJumpToPresentButton(button: React.ReactElement) {
	const ArrowIconId = getAssetIdByName("ArrowLargeDownIcon");

	// @ts-expect-error
	return button.props?.icon === ArrowIconId;
}
