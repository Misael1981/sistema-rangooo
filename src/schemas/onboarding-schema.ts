import { ContactType, RestaurantCategory } from "@prisma/client";
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

export const establishmentAddressSchema = z.object({
  street: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2).max(2, "Use apenas a sigla (ex: SP)"),
  zipCode: z.string().optional(),
});

export const establishmentContactInfoSchema = z.object({
  contacts: z
    .array(
      z.object({
        type: z.nativeEnum(ContactType),
        number: z.string().min(10, "Número inválido"),
        isPrimary: z.boolean(),
      }),
    )
    .min(1, "Adicione ao menos um contato"),
  email: z.string().email("Email inválido."),
  socialMedia: z.array(
    z.object({
      name: z.string().min(1, "Diga o nome da rede social"),
      url: z.string().url("A URL da rede social é inválida"),
    }),
  ),
});
