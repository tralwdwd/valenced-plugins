import { findInReactFiber } from "@valenced/utils/react";

type ActionGroupFinder = (
	tree: React.ReactElement,
) => React.ReactElement[] | undefined;

type PropsWithChildren = {
	children: React.ReactElement[];
};

const FINDERS: ActionGroupFinder[] = [
	tree =>
		findInReactFiber(
			tree as React.ReactElement,
			node =>
				node?.[0]?.type?.name === "ActionSheetRowGroup" ||
				node?.[0]?.props?.children?.[0]?.props?.label,
		) as React.ReactElement[] | undefined,

	tree =>
		(
			findInReactFiber(
				tree as React.ReactElement,
				node => node?.type?.name === "Stack" || node?.props?.spacing,
			) as React.ReactElement<PropsWithChildren> | undefined
		)?.props.children,

	tree =>
		(
			findInReactFiber(
				tree as React.ReactElement,
				node =>
					!!(
						node as React.ReactElement<PropsWithChildren>
					)?.props?.children?.find?.(
						// @ts-expect-error
						child => child.props?.children?.[0]?.props?.label,
					),
			) as React.ReactElement<PropsWithChildren> | undefined
		)?.props.children,
];

export function findActionGroups(tree: React.ReactElement) {
	for (const finder of FINDERS) {
		const result = finder(tree);

		if (result != null) return result;
	}
}
