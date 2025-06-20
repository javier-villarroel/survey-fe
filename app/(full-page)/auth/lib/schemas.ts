import { COMMON_VALIDATORS } from "@/app/(main)/components/common/lib/common.validators";
import * as z from "zod";

export const loginSchema = z.object({
	email: COMMON_VALIDATORS.STRING,
	password: COMMON_VALIDATORS.STRING,
});

export const newPasswordSchema = z
	.object({
		password: COMMON_VALIDATORS.STRING,
		confirmPassword: COMMON_VALIDATORS.STRING,
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "No coinciden las contraseñas",
				path: ["confirmPassword"],
			});
		}
	});

export const recoverPasswordSchema = z.object({
	email: COMMON_VALIDATORS.EMAIL,
});

export const tokenOtpSchema = z.object({
	passToken: COMMON_VALIDATORS.STRING,
	token: COMMON_VALIDATORS.STRING,
	userId: COMMON_VALIDATORS.NUMBER.optional(),
});

export const passwordSchema = z
	.object({
		password: COMMON_VALIDATORS.STRING,
		userId: COMMON_VALIDATORS.NUMBER,
		confirmPassword: COMMON_VALIDATORS.STRING.optional(),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword && confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "No coinciden las contraseñas",
				path: ["confirmPassword"],
			});
		}
	});

export const createUserSchema = z.object({
	firstName: COMMON_VALIDATORS.STRING,
	lastName: COMMON_VALIDATORS.STRING,
	email: COMMON_VALIDATORS.STRING.email("Correo electrónico inválido"),
	phone: COMMON_VALIDATORS.STRING
});

export type IFormChangePassword = z.infer<typeof passwordSchema>;
export type IFormRecoverPassword = z.infer<typeof recoverPasswordSchema>;
export type IFormToken = z.infer<typeof tokenOtpSchema>;
export type IFormNewPassword = z.infer<typeof newPasswordSchema>;
export type FormLogin = z.infer<typeof loginSchema>;
export type CreateUserForm = z.infer<typeof createUserSchema>;
