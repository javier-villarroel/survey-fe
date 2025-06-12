import { z } from "zod";

export const createUserSchema = z.object({
  id: z.number().optional(),
  pidType: z.string().optional(),
  pid: z.string().optional(),
  lastName: z.string({ message: "Requerido" })
    .nonempty({ message: "Requerido" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙ\s\-]*$/, { message: "Este campo solo admite caracteres alfabéticos" }),
  firstName: z.string({ message: "Requerido" })
    .nonempty({ message: "Requerido" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙ\s\-]*$/, { message: "Este campo solo admite caracteres alfabéticos" })
    .refine(value => value.trim() === '' || /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙ\s\-]+$/.test(value), {
      message: "Este campo solo admite caracteres alfabéticos",
    }),
  status: z.string({ message: "Requerido" }).nonempty({ message: "Requerido" }),
  email: z.string({ message: "Requerido" })
    .nonempty({ message: "Requerido" })
    .email({ message: "Debe ser un correo electrónico válido" }),
  phoneCode: z.string({ message: "Requerido" })
    .nonempty({ message: "Requerido" }),
  phoneNumber: z.string({ message: "Requerido" })
    .nonempty({ message: "Requerido" })
    .length(7, { message: "El número de teléfono debe de tener 7 dígitos" }),
});

export type IFormCreateUser = z.infer<typeof createUserSchema>;