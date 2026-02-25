"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const finalizeOnboarding = async (
  restaurantId: string,
  token: string,
) => {
  try {
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        isConfigured: true,
        onboardingCompleted: true,
      },
    });

    revalidatePath(`/onboarding?token=${token}`);
    return { success: true };
  } catch (error) {
    console.error("Erro ao finalizar onboarding:", error);
    return { error: "Erro ao finalizar cadastro." };
  }
};
