"use server";

import db from "@/lib/prisma";
import { methodsSchema } from "@/schemas/onboarding-schema";
import { revalidatePath } from "next/cache";
import z from "zod";

type Step = "methods" | "schedules";

export const updateRestaurantMethods = async (
  data: z.infer<typeof methodsSchema>,
  restaurantId: string,
  token: string,
  step: Step,
) => {
  const deliveryFee = data.consumptionMethods.includes("DELIVERY")
    ? (data.deliveryFee ?? 0)
    : 0;

  try {
    if (!restaurantId) {
      return { error: "Restaurante não encontrado." };
    }

    switch (step) {
      case "methods": {
        await db.$transaction([
          db.restaurantConsumptionMethod.updateMany({
            where: { restaurantId },
            data: { isActive: false },
          }),

          ...data.consumptionMethods.map((method) =>
            db.restaurantConsumptionMethod.upsert({
              where: { restaurantId_method: { restaurantId, method } },
              update: { isActive: true },
              create: { restaurantId, method, isActive: true },
            }),
          ),

          db.restaurant.update({
            where: { id: restaurantId },
            data: { deliveryFee },
          }),
        ]);

        break;
      }

      case "schedules": {
        // Aqui será código de horários
      }
    }

    revalidatePath(`/onboarding?token=${token}`);
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar step:", error);
    return { error: "Erro ao salvar dados." };
  }
};
