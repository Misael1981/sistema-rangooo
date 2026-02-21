"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateCategoryInput {
  name: string;
  restaurantId: string;
  token: string;
}

export async function createCategory({
  name,
  restaurantId,
  token,
}: CreateCategoryInput) {
  try {
    const restaurant = await db.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      return { success: false, error: "Restaurante não encontrado" };
    }

    const newCategory = await db.$transaction(async (tx) => {
      const lastCategory = await tx.menuCategory.findFirst({
        where: { restaurantId },
        orderBy: { displayOrder: "desc" },
      });

      return await tx.menuCategory.create({
        data: {
          name,
          restaurantId,
          displayOrder: (lastCategory?.displayOrder ?? -1) + 1,
        },
      });
    });

    revalidatePath(`/onboarding?token=${token}`);
    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return { success: false, error: "Falha ao criar categoria" };
  }
}

export async function deleteCategory(categoryId: string, token: string) {
  try {
    await db.menuCategory.delete({
      where: { id: categoryId },
    });

    revalidatePath(`/onboarding?token=${token}`);
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    return { success: false, error: "Falha ao deletar categoria" };
  }
}
