import { Page, TableRowAssetIcon } from "@valenced/components";
import { ActionSheetActionCreators } from "@valenced/discord/actions";
import { Design } from "@valenced/discord/design";
import { QuickActionKey } from "../lib/actions";
import type { PluginSettingsComponent } from "@valenced/plugins/types";
import type { QuickActionStorage } from "../types";

type Props = React.ComponentProps<
	PluginSettingsComponent<{ jsonStorage: QuickActionStorage }>
>;

export function SettingsComponent({ api }: Props) {
	const { actionConfigs } = api.jsonStorage.use()!;

	const openActionSheet = (index: number) =>
		ActionSheetActionCreators.openLazy(
			import("./components/QuickActionSheet"),
			"quick-action-sheet",
			{
				api,
				index,
			},
		);

	const createAction = () => {
		actionConfigs.push({
			title: "New Action",
			icon: "MagicWandIcon",
			arrow: false,
			action: QuickActionKey.ReloadApp,
		});

		api.jsonStorage.set({ actionConfigs });

		openActionSheet(actionConfigs.length - 1);
	};

	return (
		<Page>
			<Design.TableRowGroup title="Configured Actions">
				{actionConfigs.map((action, index) => (
					<Design.TableRow
						label={action.title}
						icon={<TableRowAssetIcon name={action.icon} />}
						arrow
						onPress={() => openActionSheet(index)}
					/>
				))}
			</Design.TableRowGroup>
			<Design.Button
				text="New Action"
				variant="primary"
				size="md"
				onPress={createAction}
			/>
		</Page>
	);
}
