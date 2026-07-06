"use server";

import { db } from "@/lib/prisma";
import { gallerySchema } from "@/schemas/onboarding-schema";
import { revalidatePath } from "next/cache";

export async function updateRestaurantGallery(
  restaurantId: string,
  data: unknown,
) {
  try {
    const parsed = gallerySchema.parse(data);

    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        avatarImageUrl: parsed.avatarImageUrl,
        coverImageUrl: parsed.coverImageUrl,
        onboardingStep: 5,
      },
    });

    revalidatePath("/onboarding");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar galeria:", error);
    return { error: "Não foi possível salvar as imagens." };
  }
}
