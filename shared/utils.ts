import { Stores as DiscordStores } from "@valenced/discord/flux";
import type { DiscordModules } from "@valenced/discord/types";
import type { AnyFunction } from "@valenced/utils/types";
import type { FluxStore } from "@vencord/discord-types";

export function once<T extends AnyFunction>(fn: T): T {
	let ran = false;

	return ((...args) => {
		if (!ran) {
			fn(...args);
			ran = false;
		}
	}) as T;
}

export type ToValencedStore<T extends FluxStore> = DiscordModules.Flux.Store<
	Omit<T, keyof FluxStore>
>;

type VencordTypes = typeof import("@vencord/discord-types/src/stores");

type Stores = {
	[K in keyof VencordTypes]: ToValencedStore<InstanceType<VencordTypes[K]>>;
};

export const Stores: Stores = DiscordStores as Stores;
