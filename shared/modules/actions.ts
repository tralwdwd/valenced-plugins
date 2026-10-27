import { ConstantsModuleId } from "@valenced/discord/common/constants";
import { LoggerModuleId } from "@valenced/discord/common/logger";
import { lookupModule } from "@valenced/modules/finders";
import {
    withDependencies,
    withName,
    withProps,
} from "@valenced/modules/finders/filters";
import { proxify } from "@valenced/utils/proxy";

const { relative, ordered } = withDependencies;

type UserActionCreators = {
	// we don't care about return
	getUser(id: string): Promise<any>;
	fetchProfile(): any;
};

export let UserActionCreators: UserActionCreators = proxify(() => {
	const [, AsyncToGeneratorModuleId] = lookupModule(
		withName("_asyncToGenerator"),
	)!;

	const [module] = lookupModule(
		withProps<UserActionCreators>("getUser", "fetchProfile").and(
			withDependencies(
				ordered([AsyncToGeneratorModuleId, ConstantsModuleId, LoggerModuleId]),
			),
		),
	);

	if (module) return (UserActionCreators = module);
})!;

type MessageActionCreators = {
	jumpToMessage(config: {
		channelId?: string;
		messageId?: string;
		flash?: boolean;
		jumpType?: string;
	}): void;
};

export let MessageActionCreators: MessageActionCreators = proxify(
	() => {
		const [, SlicedToArrayModuleId] = lookupModule(withName("_slicedToArray"))!;
		const [, AsyncToGeneratorModuleId] = lookupModule(
			withName("_asyncToGenerator"),
		);

		const [module] = lookupModule(
			withProps<MessageActionCreators>("jumpToMessage").and(
				withDependencies(
					ordered([
						SlicedToArrayModuleId,
						AsyncToGeneratorModuleId,
						relative(1),
						relative(2),
					]),
				),
			),
		);

		if (module) return (MessageActionCreators = module);
	},
	{ hint: {} },
)!;
