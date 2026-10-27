import { ActionSheetActionCreatorsModuleId } from "@valenced/discord/actions";
import { ImportTrackerModuleId } from "@valenced/discord/common/import-tracker";
import { getModules, lookupModule } from "@valenced/modules/finders";
import {
    withDependencies,
    withProps,
} from "@valenced/modules/finders/filters";
import { instead } from "@valenced/patcher";
import { proxify } from "@valenced/utils/proxy";
import type { PluginApi } from "@valenced/plugins/types";
import type { Channel, Message, User } from "@vencord/discord-types";

type MessageActionSheetProps = {
	actionSheetSource?: string;
	canAddNewReactions: boolean;
	channel: Channel;
	message: Message;
	user: User;
};

type MessageActionSheetUtils = {
	showLongPressMessageActionSheet: (props: MessageActionSheetProps) => void;
};

let MessageActionSheetUtils: MessageActionSheetUtils = proxify(() => {
	const [module] = lookupModule(
		withProps<MessageActionSheetUtils>("showLongPressMessageActionSheet").and(
			withDependencies([
				ActionSheetActionCreatorsModuleId,
				null,
				null,
				ImportTrackerModuleId,
			]),
		),
	);

	if (module) return (MessageActionSheetUtils = module);
})!;

export function patchSearchRowList({ cleanup, unscoped }: PluginApi) {
	const { ActionSheetPatcher } = unscoped.tralwdwdd;

	cleanup(
		getModules(withProps("SearchListRow"), SearchListRowModule => {
			cleanup(
				instead(
					SearchListRowModule?.SearchListRow,
					"type",
					([props], original) => {
						const ret = original(props);

						if (typeof props.label === "string") return ret;

						const { message, channel } = props.label.props as {
							message: Message;
							channel: Channel;
						};

						if (!message) return ret;

						const user = message.author;

						const actionSheetConfig: MessageActionSheetProps = {
							canAddNewReactions: true,
							channel,
							message,
							user,
						};

						ret.props.onLongPress = () => {
							MessageActionSheetUtils.showLongPressMessageActionSheet(
								actionSheetConfig,
							);
						};

						return ret;
					},
				),
			);
		}),

		ActionSheetPatcher.registerPropsPatch<MessageActionSheetProps>(
			"MessageLongPressActionSheet",
			config => {
				if (config.actionSheetSource === "Preview") {
					config.actionSheetSource = void 0;
					config.canAddNewReactions = true;
				}
			},
		),
	);
}
