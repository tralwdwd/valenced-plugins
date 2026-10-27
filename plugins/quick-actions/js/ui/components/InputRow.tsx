import { Design } from "@valenced/discord/design";
import { ReactNative } from "@valenced/react";
import { without } from "../../lib/utils";

type TextInputProps = React.ComponentProps<typeof Design.TextInput>;

export const InputRow = (props: TextInputProps) => (
	<Design.ActionSheetRow
		label={props.label!}
		subLabel={
			<ReactNative.View style={{ marginTop: 8 }}>
				<Design.TextInput {...without(props, "label")} />
			</ReactNative.View>
		}
	/>
);
