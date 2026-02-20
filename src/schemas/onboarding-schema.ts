import { RestaurantCategory } from "@prisma/client";
import z from "zod";

export const ownerSchema = z.object({
  name: z.string().min(2, "Nome obrigatório."),
  phone: z.string().min(10, "Telefone inválido."),
  email: z.string().email("Email inválido."),
});

export const generalInfoSchema = z.object({
  name: z.string().min(2, "Nome obrigatório."),
  category: z.enum(RestaurantCategory, {
    message: "Selecione uma categoria válida",
  }),
  slug: z.string().min(2, "Campo obrigatório."),
  description: z.string().optional(),
});
