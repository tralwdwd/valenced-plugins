import { QuickActionKey } from "./lib/actions";
import { patchActionSheet } from "./patches/actionsheet";
import { SettingsComponent } from "./ui/Settings";
import type { QuickActionStorage } from "./types";

export default plugin<{ jsonStorage: QuickActionStorage }>({
	jsonStorage: {
		load: true,
		default: {
			actionConfigs: [
				{
					title: "Reload App",
					icon: "RetryIcon",
					arrow: false,
					action: QuickActionKey.ReloadApp,
				},
				{
					title: "Valenced Support Channel",
					icon: "CircleQuestionIcon",
					arrow: true,
					action: QuickActionKey.SupportChannel,
				},
				{
					title: "Plugins",
					icon: "PuzzlePieceIcon",
					arrow: true,
					action: QuickActionKey.Plugins,
				},
			],
		},
	},
	start(api) {
		patchActionSheet(api);
	},
	SettingsComponent,
});
