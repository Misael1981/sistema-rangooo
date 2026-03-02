import { ContactType, PlanType, RestaurantCategory } from "@prisma/client";
import z from "zod";

export const ownerSchema = z.object({
  name: z.string().min(2, "Nome obrigatório."),
  phone: z.string().min(10, "Telefone inválido."),
  email: z.string().email("Email inválido."),
});

export const generalInfoSchema = z.object({
  name: z.string().min(2, "Nome obrigatório."),
  plan: z.enum(PlanType, {
    message: "Selecione um plano válido",
  }),
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

export const gallerySchema = z.object({
  avatarImageUrl: z
    .union([z.string(), z.any()])
    .refine((val) => val, "Imagem de perfil obrigatória"),
  coverImageUrl: z
    .union([z.string(), z.any()])
    .refine((val) => val, "Imagem de capa obrigatória"),
});

export const tableMenuSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
});

export const productSchema = z.object({
  imageUrl: z.any().refine((val) => val, "Imagem é obrigatória"),
  name: z.string().min(1, "Nome é obrigatório"),

  price: z.string().min(1, "Preço é obrigatório"),
  ingredients: z
    .string()
    .min(3, "Descreva ao menos um ingrediente")
    .optional()
    .or(z.literal("")),
  description: z.string().nullable().optional(),
});

export const methodsSchema = z
  .object({
    consumptionMethods: z.array(
      z.enum(["DINE_IN", "PICKUP", "DELIVERY"] as const),
    ),
    paymentMethods: z.array(
      z.enum(["CASH", "PIX", "CREDIT_CARD", "DEBIT_CARD"] as const),
    ),
    deliveryFee: z.coerce
      .number()
      .min(0)
      .optional()
      .transform((v) => (Number.isNaN(v) ? undefined : v)),
  })
  .refine(
    (data) =>
      !data.consumptionMethods.includes("DELIVERY") ||
      (data.deliveryFee ?? 0) > 0,
    {
      message: "Informe o valor do frete para entrega",
      path: ["deliveryFee"],
    },
  );
