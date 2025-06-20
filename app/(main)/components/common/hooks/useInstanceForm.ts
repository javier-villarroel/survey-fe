import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, DefaultValues } from "react-hook-form";

export const useInstanceForm = <T extends FieldValues>(
	schema: any,
	defaultValues?: DefaultValues<T>,
) => {
	const form = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	return form;
};
