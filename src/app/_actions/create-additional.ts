"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateAdditionalInput {
  name: string;
  price: number;
  menuCategoryId: string;
  token: string;
}

type UpdateAdditionalInput = {
  additionalId: string;
  token: string;
  name?: string;
  price?: number;
};

export async function createAdditional({
  name,
  price,
  menuCategoryId,
  token,
}: CreateAdditionalInput) {
  try {
    const categoryExists = await db.menuCategory.findUnique({
      where: { id: menuCategoryId },
    });

    if (!categoryExists) {
      return { success: false, error: "Categoria inválida." };
    }

    await db.additionalIngredient.create({
      data: {
        name,
        price: Number(price),
        menuCategoryId,
      },
    });

    revalidatePath(`/onboarding?token=${token}`);

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar adicional:", error);
    return { success: false, error: "Falha ao criar o ingrediente adicional." };
  }
}

export async function updateAdditional({
  additionalId,
  name,
  price,
  token,
}: UpdateAdditionalInput) {
  try {
    await db.additionalIngredient.update({
      where: { id: additionalId },
      data: { name, price },
    });
    revalidatePath(`/onboarding?token=${token}`);
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar adicional:", error);
    return { success: false, error: "Falha ao atualizar." };
  }
}

export async function deleteAdditional({
  additionalId,
  token,
}: UpdateAdditionalInput) {
  try {
    await db.additionalIngredient.delete({
      where: { id: additionalId },
    });

    revalidatePath(`/onboarding?token=${token}`);

    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir adicional:", error);
    return { success: false, error: "Falha ao remover o item." };
  }
}
