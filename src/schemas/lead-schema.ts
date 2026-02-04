import z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome completo é obrigatório (mínimo 2 caracteres).",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 dígitos.",
  }),
  restaurantName: z.string().min(2, {
    message: "Nome do estabelecimento é obrigatório.",
  }),
  city: z.string().min(2, {
    message: "Cidade é obrigatória.",
  }),
  state: z
    .string()
    .length(2, {
      message: "Estado deve ter 2 caracteres (ex: SP, RJ).",
    })
    .toUpperCase(),
  notes: z.string().optional(),
});
