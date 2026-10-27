import { TableRowAssetIcon } from "@valenced/components";
import { Design } from "@valenced/discord/design";
import { QuickActions } from "../../lib/actions";
import type { QuickActionKey } from "../../lib/actions";
import type { QuickAction } from "../../types";

type ActionSelectionSheetProps = {
	selectedAction: QuickActionKey;
	onValueChange: (key: QuickActionKey) => void;
};

export default function ActionSelectionSheet({
	selectedAction,
	onValueChange,
}: ActionSelectionSheetProps) {
	return (
		<Design.ActionSheet>
			<Design.BottomSheetTitleHeader title="Select Action" />
			<Design.TableRadioGroup
				defaultValue={selectedAction}
				onChange={onValueChange}
			>
				{(Object.keys(QuickActions) as QuickActionKey[]).map(
					key => {
						const action = QuickActions[key] as QuickAction;

						return (
							<Design.TableRadioRow
								label={action.name}
								icon={<TableRowAssetIcon name={action.icon} />}
								value={key}
							/>
						);
					},
				)}
			</Design.TableRadioGroup>
		</Design.ActionSheet>
	);
}
