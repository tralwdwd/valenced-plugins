import { ReactNative } from "@valenced/react";

export function UpsideDown({ children }: React.PropsWithChildren) {
	return (
		<ReactNative.View
			style={{
				transform: [{ scaleY: -1 }],
			}}
		>
			{children}
		</ReactNative.View>
	);
}
