import { React } from "@valenced/react";

export function without<T extends {}>(obj: T, keyToRemove: keyof T) {
	const { [keyToRemove]: _, ...rest } = obj;
	return rest;
}

export function useDebouncedValue<T>(value: T, delay: number) {
	const [debounced, setDebounced] = React.useState(value);
	React.useEffect(() => {
		const timeout = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(timeout);
	}, [value, delay]);
	return debounced;
}
