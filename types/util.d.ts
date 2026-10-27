import type { DiscordModules } from "@valenced/discord/types";
import type { FluxStore } from "@vencord/discord-types";

export type ToValencedStore<T extends FluxStore> = DiscordModules.Flux.Store<
	Omit<T, keyof FluxStore>
>;
