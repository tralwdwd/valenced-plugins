import { ConstantsModuleId } from "@valenced/discord/common/constants";
import { ImportTrackerModuleId } from "@valenced/discord/common/import-tracker";
import { LoggerModuleId } from "@valenced/discord/common/logger";
import { lookupModule } from "@valenced/modules/finders";
import {
    withDependencies,
    withProps,
} from "@valenced/modules/finders/filters";
import { proxify } from "@valenced/utils/proxy";

const { relative, ordered } = withDependencies;

type ChannelRouter = {
	transitionToChannel(id: string): void;
};

export let ChannelRouter: ChannelRouter = proxify(
	() => {
		const [module] = lookupModule(
			withProps("transitionToChannel", "transitionToThread").and(
				withDependencies(
					ordered([ConstantsModuleId, relative(1), relative(2)]),
				),
			),
		);

		if (module) return (ChannelRouter = module);
	},
	{ hint: {} },
)!;

type GuildRouter = {
	transitionTo(location: string): void;
};

export let GuildRouter: GuildRouter = proxify(() => {
	const [module] = lookupModule(
		withProps("transitionTo", "transitionToGuild").and(
			withDependencies([
				ConstantsModuleId,
				LoggerModuleId,
				relative(1),
				null,
				null,
				ImportTrackerModuleId,
			]),
		),
	);

	if (module) return (GuildRouter = module);
}, {})!;
