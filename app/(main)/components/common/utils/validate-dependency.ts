/**
 * Determines if the provided dependency is valid based on its type and content.
 *
 * This function checks the common types e.g: strings, numbers, arrays, objects and the special case of undefined and null.
 * Otherwise, it returns true.
 *
 * @param {any} dependencie - The dependency to validate.
 * @returns {boolean} - Returns true if the dependency is considered valid, otherwise false.
 */
export const isValidDependency = (dependencie: any): boolean => {
	if (dependencie === undefined || dependencie === null) return false;

	if (typeof dependencie === "string") return dependencie.trim().length > 0;

	if (typeof dependencie === "number") return !isNaN(dependencie);

	if (Array.isArray(dependencie)) return dependencie.length > 0;

	if (typeof dependencie === "object")
		return Object.keys(dependencie).length > 0;

	//--- Other types
	return true;
};
