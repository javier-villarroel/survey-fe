import { z } from "zod";
import { COMMON_VALIDATORS } from "@/app/(main)/components/common/lib/common.validators";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const profileFormSchema = z.object({
  firstName: z.string({ required_error: "Requerido" })
    .nonempty("Requerido")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙ\s\-]*$/, "Este campo solo admite caracteres alfabéticos"),
  lastName: z.string({ required_error: "Requerido" })
    .nonempty("Requerido")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙ\s\-]*$/, "Este campo solo admite caracteres alfabéticos"),
  email: z.string({ required_error: "Requerido" })
    .nonempty("Requerido")
    .email("Debe ser un correo electrónico válido"),
  phone: z.string().optional(),
  twoFactorAuth: z.boolean(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  profileImage: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "El tamaño máximo del archivo es 5MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Solo se permiten archivos .jpg, .jpeg, .png y .webp."
    )
    .optional()
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (password && !confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Debe confirmar la contraseña",
      path: ["confirmPassword"],
    });
  }
  if (confirmPassword && !password) {
    ctx.addIssue({
      code: "custom",
      message: "Debe ingresar la contraseña",
      path: ["password"],
    });
  }
  if (password && confirmPassword && password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    });
  }
  if (password && password.length < 8) {
    ctx.addIssue({
      code: "custom",
      message: "La contraseña debe tener al menos 8 caracteres",
      path: ["password"],
    });
  }
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;