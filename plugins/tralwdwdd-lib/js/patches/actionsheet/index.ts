import { ActionSheetActionCreators } from "@valenced/discord/actions";
import { after, before } from "@valenced/patcher";
import { findActionGroups } from "./utils";
import type { PluginCleanupApi } from "@valenced/plugins/types";

type ActionSheetCallback<P extends {} = any> = (
	tree: React.ReactElement[],
	props: P,
) => void;

type ActionSheetPatchOptions = {
	findActionGroups?: (
		element: React.ReactElement,
	) => React.ReactElement[] | undefined;
};

type ActionSheetPatchConfig<P extends {} = any> = {
	finder: string | RegExp;
	callback: ActionSheetCallback<P>;
	options?: ActionSheetPatchOptions;
};

const actionSheetPatches: ActionSheetPatchConfig[] = [];

function registerActionSheetPatch<P extends {} = any>(
	finder: string | RegExp,
	callback: ActionSheetCallback<P>,
	options?: ActionSheetPatchOptions,
) {
	actionSheetPatches.push({ finder, callback, options });

	return () => {
		const index = actionSheetPatches.findIndex(
			patch => patch.callback === callback,
		);
		if (index !== -1) actionSheetPatches.splice(index, 1);
	};
}

type PropsPatchCallback<P extends {} = any> = (props: P) => void;

type PropsPatchConfig<P extends {} = any> = {
	finder: string | RegExp;
	callback: PropsPatchCallback<P>;
};

const actionSheetPropsPatches: PropsPatchConfig[] = [];

export function registerPropsPatch<P extends {} = any>(
	finder: string | RegExp,
	callback: PropsPatchCallback<P>,
) {
	actionSheetPropsPatches.push({ finder, callback });

	return () => {
		const index = actionSheetPropsPatches.findIndex(
			patch => patch.callback === callback,
		);
		if (index !== -1) actionSheetPropsPatches.splice(index, 1);
	};
}

type ActionSheetResultWithTypeFunction = {
	type: React.FC;
};

type ActionSheetResultWithChildren = {
	props: {
		children: React.ReactElement[];
	};
};

type MemoSheet = React.MemoExoticComponent<React.ComponentType<any>>;

type ActionSheetModule = {
	default: React.FC | MemoSheet;
};

export function patchActionSheet(cleanup: PluginCleanupApi) {
	cleanup(
		before(ActionSheetActionCreators, "openLazy", args => {
			const [sheet, key, props] = args;

			const propsPatches = actionSheetPropsPatches.filter(p =>
				typeof p.finder === "string" ? key === p.finder : p.finder.test(key),
			);

			propsPatches.forEach(p => p.callback(props));

			const sheetPatches = actionSheetPatches.filter(p =>
				typeof p.finder === "string" ? key === p.finder : p.finder.test(key),
			);

			if (sheetPatches.length === 0) return args;

			sheet.then(module => {
				patchSheetModule(
					module as ActionSheetModule,
					props,
					cleanup,
					sheetPatches,
				);
			});

			return args;
		}),
	);
}

function patchMemoSheet(
	module: ActionSheetModule,
	props: any,
	cleanup: PluginCleanupApi,
	patches: ActionSheetPatchConfig[],
) {
	// @ts-expect-error
	const unpatch = after(module.default as MemoSheet, "type", tree => {
		for (const patch of patches) {
			const actionGroups =
				patch.options?.findActionGroups?.(tree as React.ReactElement) ??
				findActionGroups(tree as React.ReactElement);

			if (actionGroups) patch.callback(actionGroups, props);
		}

		unpatch();

		return tree;
	});
	cleanup(unpatch);
}

function patchLazySheet(
	module: ActionSheetModule,
	props: any,
	cleanup: PluginCleanupApi,
	patches: ActionSheetPatchConfig[],
) {
	const unpatch = after(module, "default", result => {
		if (typeof (result as any)?.type === "function") {
			cleanup(
				after(result as ActionSheetResultWithTypeFunction, "type", tree => {
					for (const patch of patches) {
						const actionGroups =
							patch.options?.findActionGroups?.(tree as React.ReactElement) ??
							findActionGroups(tree as React.ReactElement);

						if (actionGroups) patch.callback(actionGroups, props);
					}

					return tree;
				}),
			);
		} else {
			const actionGroups = (result as ActionSheetResultWithChildren).props
				.children;
			if (actionGroups) {
				for (const patch of patches) patch.callback(actionGroups, props);
			}
		}

		unpatch();

		return result;
	});
	cleanup(unpatch);
}

export function patchSheetModule(
	module: ActionSheetModule,
	props: any,
	cleanup: PluginCleanupApi,
	patches: ActionSheetPatchConfig[],
) {
	if (typeof module.default === "object") {
		patchMemoSheet(module, props, cleanup, patches);
	} else {
		patchLazySheet(module, props, cleanup, patches);
	}
}

export default { registerActionSheetPatch, registerPropsPatch };
