import { FieldValues, UseFormReturn } from "react-hook-form";

type RenderErrorPropsTypes<T extends FieldValues> = {
	/**
	 * The form object returned by `useForm` hook from `react-hook-form`.
	 */
	form: UseFormReturn<T>;

	/**
	 * The key used to identify the nested error in the form state.
	 */
	key: string;
};

type ErrorPerson = {
	/**
	 * The error object containing potential validation errors.
	 */
	error: any;

	/**
	 * The string representing the path to the nested error property.
	 */
	str: string;
};

/**
 * Renders an error message by accessing a nested property in the form's error object.
 *
 * @template T - The type extending `FieldValues` to represent the form fields.
 * @param {RenderErrorPropsTypes<T>} props - The form and key for retrieving the error message.
 * @returns {string | undefined} - The error message if found, otherwise undefined.
 */
export const renderError = <T extends FieldValues>({
	form,
	key,
}: RenderErrorPropsTypes<T>) => {
	const { formState } = form;

	const errorInfo = getNestedProperty({ error: formState?.errors, str: key });

	return errorInfo && errorInfo.message;
};

/**
 * Retrieves a nested property from an object by splitting the string path.
 *
 * @param {ErrorPerson} params - The object containing the error object and the path string.
 * @returns {any} - The value of the nested property, or undefined if not found.
 */
const getNestedProperty = ({ str, error }: ErrorPerson) => {
	const parts = str.split(".");
	let current = error;

	parts.forEach((part) => {
		if (current[part] === undefined) {
			return undefined;
		}
		current = current[part];
	});

	return current;
};
