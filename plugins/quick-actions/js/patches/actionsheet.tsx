import { TableRowAssetIcon } from "@valenced/components";
import { Design } from "@valenced/discord/design";
import { QuickActions } from "../lib/actions";
import type { PluginApi } from "@valenced/plugins/types";
import type { QuickActionStorage } from "../types";

export function patchActionSheet({
	jsonStorage,
	unscoped,
	cleanup,
}: PluginApi<{ jsonStorage: QuickActionStorage }>) {
	const { ActionSheetPatcher } = unscoped.tralwdwdd;

	cleanup(
		ActionSheetPatcher.registerActionSheetPatch(
			"you-account-action-sheet-key",
			tree => {
				const { actionConfigs } = jsonStorage.use()!;

				if (actionConfigs.length === 0) return;

				tree.unshift(
					<Design.ActionSheetRow.Group title="Quick Actions">
						{actionConfigs.map(config => (
							<Design.ActionSheetRow
								label={config.title}
								icon={<TableRowAssetIcon name={config.icon} />}
								arrow={config.arrow}
								onPress={QuickActions[config.action].action}
							/>
						))}
					</Design.ActionSheetRow.Group>,
				);
			},
		),
	);
}
