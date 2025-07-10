import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string({ message: "Requerido" })
    .nonempty({ message: "Requerido" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙ\s\-]*$/, { message: "Este campo solo admite caracteres alfabéticos" }),
  lastName: z.string({ message: "Requerido" })
    .nonempty({ message: "Requerido" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙ\s\-]*$/, { message: "Este campo solo admite caracteres alfabéticos" }),
  email: z.string({ message: "Requerido" })
    .nonempty({ message: "Requerido" })
    .email({ message: "Debe ser un correo electrónico válido" }),
  phonePrefix: z.string({ message: "Requerido" })
    .nonempty({ message: "El prefijo es requerido" }),
  phoneNumber: z.string({ message: "Requerido" })
    .nonempty({ message: "El número es requerido" })
    .length(7, { message: "El número debe tener 7 dígitos" })
    .regex(/^\d+$/, { message: "Solo se permiten números" }),
  status: z.string().optional(),
  id: z.number().optional(),
  pidType: z.string().optional(),
  pid: z.string().optional()
});

export type IFormCreateUser = z.infer<typeof createUserSchema>;