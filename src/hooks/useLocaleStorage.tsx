import { useEffect } from 'react';
import { useImmer } from 'use-immer';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
	const [value, setValue] = useImmer<T>(() => {
		const storageValue = localStorage.getItem(key);
		if (storageValue) {
			return JSON.parse(storageValue);
		}
		if (initialValue instanceof Function) {
			return initialValue();
		} else {
			return initialValue;
		}
	});
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as [typeof value, typeof setValue];
}
