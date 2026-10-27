import { ConstantsModuleId } from "@valenced/discord/common/constants";
import { ImportTrackerModuleId } from "@valenced/discord/common/import-tracker";
import { lookupModule } from "@valenced/modules/finders";
import {
    withDependencies,
    withName,
    withProps,
} from "@valenced/modules/finders/filters";
import { ReactModuleId } from "@valenced/react";
import { proxify } from "@valenced/utils/proxy";
import type { DiscordModules } from "@valenced/discord/types";
import type { useStateFromStores } from "@vencord/discord-types";

const { relative, ordered } = withDependencies;

// #region flux

type FluxUtils = {
	useStateFromStoresArray<T = any>(
		stores: DiscordModules.Flux.Store[],
		factory: () => T[],
	): T[];
	useStateFromStores: useStateFromStores;
};

export let FluxUtils: FluxUtils = proxify(() => {
	const [, SlicedToArrayModuleId] = lookupModule(withName("_slicedToArray"))!;

	const [module] = lookupModule(
		withProps<FluxUtils>("useStateFromStoresArray", "useStateFromStores").and(
			withDependencies(
				ordered([SlicedToArrayModuleId, ReactModuleId, relative(1)]),
			),
		),
	);

	if (module) return (FluxUtils = module);
})!;

// #endregion

// #region permission stuff

let BigFlagsFilter: number[] = proxify(() => {
	const [, SlicedToArrayModuleId] = lookupModule(withName("_slicedToArray"))!;
	const [, IntegerModuleId] = lookupModule(withName("Integer"))!;

	if (SlicedToArrayModuleId && IntegerModuleId)
		return (BigFlagsFilter = [
			SlicedToArrayModuleId,
			IntegerModuleId,
			ImportTrackerModuleId,
		]);
})!;

export type BigFlags = bigint;

type BigFlagUtils = {
	has(bigflag: BigFlags, flag: BigFlags): boolean;
	getFlag(bit: number): BigFlagUtils;
};

export let BigFlagUtils: BigFlagUtils = proxify(
	() => {
		const [module] = lookupModule(
			withProps<BigFlagUtils>("has", "getFlag").and(
				withDependencies(BigFlagsFilter),
			),
		);

		if (module) return (BigFlagUtils = module);
	},
	{ hint: {} },
)!;

type PermissionUtils = {
	OrderedPermissions: BigFlags[];
	getPermissionName(flags: BigFlags): string;
};

export let PermissionUtils: PermissionUtils = proxify(
	() => {
		const [module] = lookupModule(
			withProps<PermissionUtils>("OrderedPermissions", "getPermissionName").and(
				withDependencies([
					ConstantsModuleId,
					BigFlagsFilter,
					null,
					ImportTrackerModuleId,
				]),
			),
		);

		if (module) return (PermissionUtils = module);
	},
	{ hint: {} },
)!;

// #endregion
