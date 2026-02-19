import z from "zod";

export const ownerSchema = z.object({
  name: z.string().min(2, "Nome obrigatório."),
  phone: z.string().min(10, "Telefone inválido."),
  email: z.string().email("Email inválido."),
});
