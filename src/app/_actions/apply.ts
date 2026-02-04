"use server";

import db from "@/lib/prisma";
import { formSchema } from "@/schemas/lead-schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function submitApplication(data: unknown) {
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return { error: "Dados inválidos. Verifique o formulário." };
  }

  try {
    const lead = await db.leadApplication.create({
      data: result.data,
    });

    return { success: true, id: lead.id };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: "Você já tem uma solicitação pendente com este e-mail.",
        };
      }
    }

    console.error("Erro original:", error);
    return { error: "Opa! Algo deu errado no servidor." };
  }
}
