"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpsertProductPayload {
  id?: string;
  name: string;
  price: number;
  description?: string | null;
  imageUrl: string;
  ingredients: string[];
  menuCategoryId: string;
}

export const upsertProduct = async (
  data: UpsertProductPayload,
  token: string,
  restaurantId: string,
) => {
  try {
    let finalRestaurantId = restaurantId;

    if (!data.id && !finalRestaurantId) {
      const restaurant = await db.restaurant.findUnique({
        where: { id: restaurantId },
      });

      if (!restaurant) throw new Error("Restaurante não encontrado");

      finalRestaurantId = restaurant.id;
    }

    if (data.id) {
      await db.product.update({
        where: { id: data.id },
        data: {
          name: data.name,
          price: data.price,
          description: data.description,
          imageUrl: data.imageUrl,
          ingredients: data.ingredients,
        },
      });
    } else {
      await db.product.create({
        data: {
          name: data.name,
          price: data.price,
          description: data.description,
          imageUrl: data.imageUrl,
          ingredients: data.ingredients,
          menuCategoryId: data.menuCategoryId,
          restaurantId: finalRestaurantId as string,
        },
      });
    }

    revalidatePath(`/onboarding?token=${token}`);
    return { success: true };
  } catch (error) {
    console.error("Erro na Action upsertProduct:", error);
    return { success: false, error: "Erro ao salvar o produto." };
  }
};

export const deleteProduct = async (
  id: string,
  restaurantId: string,
  token: string,
) => {
  try {
    await db.product.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/onboarding?token=${token}`);

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return { success: false, error: "Falha ao deletar o produto." };
  }
};
