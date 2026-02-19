"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function syncOnboardingStep(
  restaurantId: string,
  step: number,
  data: any,
) {
  try {
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        ...data,
        onboardingStep: step,
      },
    });

    revalidatePath("/onboarding");
    return { success: true };
  } catch (error) {
    return { error: "Erro ao salvar progresso." };
    console.error(error);
  }
}
