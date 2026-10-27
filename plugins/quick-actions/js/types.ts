import type { QuickActionKey } from "./lib/actions";

export type QuickAction = {
	name: string;
	icon: string;
	action(): void;
};

export type QuickActionConfig = {
	icon: string;
	title: string;
	arrow: boolean;
	action: QuickActionKey;
};

export type QuickActionStorage = {
	actionConfigs: QuickActionConfig[];
};
