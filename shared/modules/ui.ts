import { ConstantsModuleId } from "@valenced/discord/common/constants";
import { lookupModule } from "@valenced/modules/finders";
import {
    withDependencies,
    withProps,
} from "@valenced/modules/finders/filters";
import {
    ReactJSXRuntimeModuleId,
    ReactModuleId,
    ReactNativeModuleId,
} from "@valenced/react";
import { proxify } from "@valenced/utils/proxy";
import type { Role, User } from "@vencord/discord-types";

const { partial } = withDependencies;

type AvatarProps = {
	user: User;
	size?:
		| "extraSmall10"
		| "extraSmall"
		| "small"
		| "small20"
		| "medium"
		| "large"
		| "custom"
		| "refreshSmall16"
		| "small14";
	guildId?: string;
};

type VoidAvatar = React.MemoExoticComponent<React.ComponentType<AvatarProps>>;

type VoidAvatarModule = {
	default: VoidAvatar;
	AvatarSizes: any;
	getStatusSize: any;
};

export let VoidAvatar: VoidAvatar = proxify(
	() => {
		const [module] = lookupModule(
			withProps<VoidAvatarModule>("AvatarSizes", "getStatusSize").and(
				withDependencies(
					partial([
						ReactModuleId,
						ReactNativeModuleId,
						ConstantsModuleId,
						null,
						ReactJSXRuntimeModuleId,
					]),
				),
			),
		);

		if (module?.default) return (VoidAvatar = module.default);
	},
	{ hint: {} },
)!;

type RoleItemProps = {
	role: Role;
	guildId: string;
};

type RoleItemModule = {
	RoleItem: RoleItem;
};

type RoleItem = React.FC<RoleItemProps>;

export let RoleItem: RoleItem = proxify(() => {
	const [module] = lookupModule(
		withProps<RoleItemModule>("RoleItem").and(
			withDependencies(
				partial([
					ReactModuleId,
					ReactNativeModuleId,
					null,
					null,
					null,
					ReactJSXRuntimeModuleId,
				]),
			),
		),
	);

	if (module?.RoleItem) return (RoleItem = module.RoleItem);
})!;
