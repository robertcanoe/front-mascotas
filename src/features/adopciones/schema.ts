import { z } from "zod";

export const adopcionSchema = z.object({
  mascota_id: z.coerce.number().int().positive(),
  solicitante: z.string().min(2, "El nombre es obligatorio."),
  email: z.string().email("Ingresa un email valido."),
  mensaje: z.string().optional(),
});

export type AdopcionFormValues = z.infer<typeof adopcionSchema>;
