"use server";

import db from "@/lib/prisma";
import { formSchema } from "@/schemas/lead-schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { headers } from "next/headers";

export async function submitApplication(data: unknown) {
  // 1. Rate Limit Simples por Headers (ou use Upstash aqui)
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "unknown";

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return { error: "Dados inválidos. Verifique o formulário." };
  }

  try {
    const lead = await db.leadApplication.create({
      data: result.data,
    });

    return {
      success: true,
      id: lead.id,
      name: result.data.name,
      restaurantName: result.data.restaurantName,
    };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: "Já existe uma solicitação com este e-mail ou telefone.",
        };
      }
    }

    console.error("Erro original:", error);
    return { error: "Opa! Algo deu errado no servidor." };
  }
}
