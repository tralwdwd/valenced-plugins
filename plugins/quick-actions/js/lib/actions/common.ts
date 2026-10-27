import { ActionSheetActionCreators } from "@valenced/discord/actions";

export const withHideActionSheet = (action: () => void) => {
    action();
    ActionSheetActionCreators.hideActionSheet();
};

export const RouteNames = {
    ValencedPlugins: "Valenced Plugins",
    ValencedAdvancedPlugins: "Valenced Plugins Advanced",
} as const;