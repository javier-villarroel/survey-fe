export function removeUndefinedAndEmptyDeep<T>(obj: T): T | undefined {
	if (!obj || typeof obj !== "object") return obj;

	const process = (value: keyof T) => removeUndefinedAndEmptyDeep(value);

	if (Array.isArray(obj)) {
		const filteredArray = obj
			.map(process)
			.filter((item) => item !== undefined && item !== null && item !== "");

		return filteredArray.length ? (filteredArray as T) : undefined;
	}

	const cleanedObject = Object.fromEntries(
		Object.entries(obj)
			.map(([key, value]) => [key, process(value)])
			.filter(
				([_, value]) => value !== undefined && value !== null && value !== "",
			),
	) as T;

	return Object.keys(cleanedObject as keyof typeof cleanedObject).length
		? cleanedObject
		: undefined;
}
