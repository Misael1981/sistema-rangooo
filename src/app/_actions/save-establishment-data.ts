"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveEstablishmentData(
  restaurantId: string,
  data: any, // Aqui virão todos os seus dados do Step 2
) {
  try {
    // Usamos uma transação para garantir a integridade dos dados
    await db.$transaction([
      // 1. Update das informações básicas
      db.restaurant.update({
        where: { id: restaurantId },
        data: {
          name: data.name,
          slug: data.slug,
          category: data.category,
          description: data.description,
          // Endereço (se for um campo JSON ou colunas separadas)
          address: {
            upsert: {
              create: data.address,
              update: data.address,
            },
          },
        },
      }),
      // 2. Limpar contatos antigos para inserir os novos (limpeza estratégica)
      db.contact.deleteMany({ where: { restaurantId } }),
      db.contact.createMany({
        data: data.contacts.map((c: any) => ({ ...c, restaurantId })),
      }),
      // 3. Mesma lógica para redes sociais
      db.socialMedia.deleteMany({ where: { restaurantId } }),
      db.socialMedia.createMany({
        data: data.socialMedia.map((s: any) => ({ ...s, restaurantId })),
      }),
    ]);

    revalidatePath("/onboarding");
    return { success: true };
  } catch (error) {
    console.error("Erro na persistência progressiva:", error);
    return { error: "Falha ao salvar dados. Tente novamente." };
  }
}
