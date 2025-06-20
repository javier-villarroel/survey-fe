import { z } from "zod";

const REGEXS = {
	STRING_REQUIRED: /^(?!\s*$).+/,
	PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};

const MIN_LENGTH = 9;
const MAX_LENGTH = 30;
const MAX_LENGTH_PACKAGES = 20;

const hasLetter = (value: string) => /[a-zA-Z]/.test(value);
const hasNumber = (value: string) => /\d/.test(value);
const hasSpecialChar = (value: string) => /[@$!%*#?&]/.test(value);
const hasMinLength = (value: string) => value.length >= MIN_LENGTH;
const hasMaxLength = (value: string) => value.length <= MAX_LENGTH;
const hasMaxLengthPackages = (value: string) =>
	value.length <= MAX_LENGTH_PACKAGES;

const hasSpecialCharMessage = "Requiere al menos un carácter especial";
const hasNumberMessage = "Requiere al menos un número";
const hasLetterMessage = "Requiere al menos una letra";
const hasMinLengthMessage = "Mínimo 9 caracteres";
const hasMaxLengthMessage = "Máximo 30 caracteres";

export const COMMON_VALIDATORS = {
	STRING: z.string({
		required_error: "Requerido",
	}),

	EMAIL: z
		.string({
			required_error: "Requerido",
			invalid_type_error: "Correo no valido",
		})
		.regex(REGEXS.STRING_REQUIRED, "Requerido")
		.email("Correo no valido"),

	PASSWORD: z
		.string({
			required_error: "Requerido",
			invalid_type_error: "Contraseña no valida",
		})
		.regex(REGEXS.STRING_REQUIRED, "Requerido")
		.refine(hasLetter, hasLetterMessage)
		.refine(hasSpecialChar, hasSpecialCharMessage)
		.refine(hasNumber, hasNumberMessage)
		.refine(hasMinLength, hasMinLengthMessage)
		.refine(hasMaxLength, hasMaxLengthMessage),

	UUID: z.string().uuid(),
	NUMBER: z.number(),
	BOOLEAN: z.boolean(),
	IMAGE: z.object(
		{
			original: z.object({
				preview: z.string(),
				file: z.any(),
				size: z.any(),
			}),
			compressed: z.object({
				preview: z.string(),
				file: z.any(),
				size: z.any(),
			}),
		},
		{ required_error: "Requerido", invalid_type_error: "Debe ser una imagen" },
	),
	DOCUMENT: z.object(
		{
			name: z.string(),
			size: z.number(),
			type: z.string().refine((type) => type === "application/pdf", {
				message: "Debe ser un archivo PDFS",
			}),
		},
		{
			required_error: "Requerido",
			invalid_type_error: "Debe ser un archivo PsDF",
		},
	),
	ARRAY_STRING: z.array(z.string(), {
		required_error: "Requerido",
		invalid_type_error: "Debe ser un arreglo de texto",
	}),
	ARRAY_NUMBER: z.array(z.number(), {
		required_error: "Requerido",
		invalid_type_error: "Debe ser un arreglo de texto",
	}),
};

export const INCIDENTS_VALIDATORS = {
	ID: z.array(z.string(), {
		required_error: "Requerido",
		invalid_type_error: "Debe seleccionar una opción",
	}),
	INCIDENTS: z.record(
		z.string(),
		z.object({
			comments: COMMON_VALIDATORS.STRING,
			files: z.record(z.string(), COMMON_VALIDATORS.IMAGE, {
				required_error: "Requerido",
			}),
		}),
	),
};

export const transformToNumber = (value: string | number | any) => {
	if (typeof value === "string") return Number(value);
	return value;
};
export const transformToString = (value: string | number | any) => {
	if (typeof value === "number") return String(value);
	return value;
};

export const transformToBoolean = (value: string) => {
	if (typeof value === "string") return value === "true";
	return value;
};
