import AdvancedPluginsAction from "./AdvancedPluginsAction";
import DMsAction from "./DMsAction";
import PluginsAction from "./PluginsAction";
import ReloadAppAction from "./ReloadAppAction";
import SettingsAction from "./SettingsAction";
import SupportChannelAction from "./SupportChannelAction";

export type QuickActionKey = keyof typeof QuickActions;

export const QuickActionKey = {
	ReloadApp: "ReloadApp",
	Plugins: "Plugins",
	AdvancedPlugins: "AdvancedPlugins",
	Settings: "Settings",
	SupportChannel: "SupportChannel",
	DMs: "DMs",
} as const;

export const QuickActions = {
	[QuickActionKey.ReloadApp]: ReloadAppAction,
	[QuickActionKey.Plugins]: PluginsAction,
	[QuickActionKey.AdvancedPlugins]: AdvancedPluginsAction,
	[QuickActionKey.Settings]: SettingsAction,
	[QuickActionKey.SupportChannel]: SupportChannelAction,
	[QuickActionKey.DMs]: DMsAction,
} as const;
