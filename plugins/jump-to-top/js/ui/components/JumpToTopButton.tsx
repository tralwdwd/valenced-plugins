import { React } from "@valenced/react";
import { jumpToTop } from "../../utils";
import { UpsideDown } from "./UpsideDown";

type JumpToTopButtonProps = {
	JumpToPresentButton: React.ReactElement;
	channelId: string;
	isDifferentChannel: boolean;
};

export function JumpToTopButton({
	JumpToPresentButton,
	channelId,
	isDifferentChannel,
}: JumpToTopButtonProps) {
	return (
		<UpsideDown>
			{React.cloneElement(JumpToPresentButton, {
				// @ts-expect-error
				...JumpToPresentButton.props,
				onPress: () => jumpToTop({ isDifferentChannel, channelId }),
			})}
		</UpsideDown>
	);
}
