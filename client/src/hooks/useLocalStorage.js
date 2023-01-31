import { useState, useEffect } from 'react';

function getSavedValue(key, initialValue) {
	const savedValue = JSON.parse(localStorage.getItem(key) | false);

	if (savedValue) {
		return savedValue;
	}

	if (initialValue instanceof Function) {
		return initialValue();
	}

	return initialValue;
}

function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		return getSavedValue(key, initialValue);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storedValue));
	}, [storedValue]);

	console.log(storedValue);

	return [storedValue, setStoredValue];
}

export default useLocalStorage;
