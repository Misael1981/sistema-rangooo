"use server";

import { db } from "@/lib/prisma";
import { businessHoursSchema } from "@/schemas/business-hours-schema";
import { methodsSchema } from "@/schemas/onboarding-schema";
import { revalidatePath } from "next/cache";
import z from "zod";

type Step = "methods" | "schedules";

type RestaurantUpdateData =
  | z.infer<typeof methodsSchema>
  | z.infer<typeof businessHoursSchema>;

export const updateRestaurantMethods = async (
  data: RestaurantUpdateData,
  restaurantId: string,
  token: string,
  step: Step,
) => {
  try {
    if (!restaurantId) {
      return { error: "Restaurante não encontrado." };
    }

    switch (step) {
      case "methods": {
        const methodsData = methodsSchema.parse(data);

        const deliveryFee = methodsData.consumptionMethods.includes("DELIVERY")
          ? (methodsData.deliveryFee ?? 0)
          : 0;

        const operations = [
          db.restaurantConsumptionMethod.updateMany({
            where: { restaurantId },
            data: { isActive: false },
          }),
          db.restaurantPaymentMethod.updateMany({
            where: { restaurantId },
            data: { isActive: false },
          }),
          db.restaurant.update({
            where: { id: restaurantId },
            data: { deliveryFee },
          }),
          ...methodsData.consumptionMethods.map((method) =>
            db.restaurantConsumptionMethod.upsert({
              where: { restaurantId_method: { restaurantId, method } },
              update: { isActive: true },
              create: { restaurantId, method, isActive: true },
            }),
          ),
          ...methodsData.paymentMethods.map((method) =>
            db.restaurantPaymentMethod.upsert({
              where: { restaurantId_method: { restaurantId, method } },
              update: { isActive: true },
              create: { restaurantId, method, isActive: true },
            }),
          ),
        ];
        await db.$transaction(operations);

        break;
      }

      case "schedules": {
        const parsed = businessHoursSchema.parse(data);
        const businessHoursData = parsed.businessHours;

        await db.$transaction([
          ...businessHoursData.map((bh) =>
            db.businessHours.upsert({
              where: {
                restaurantId_dayOfWeek: {
                  restaurantId,
                  dayOfWeek: bh.dayOfWeek,
                },
              },
              update: {
                isClosed: bh.isClosed,
                timeSlots: bh.timeSlots,
              },
              create: {
                restaurantId,
                dayOfWeek: bh.dayOfWeek,
                isClosed: bh.isClosed,
                timeSlots: bh.timeSlots,
              },
            }),
          ),
          db.restaurant.update({
            where: { id: restaurantId },
            data: {
              onboardingStep: 4,
            },
          }),
        ]);

        break;
      }
    }

    revalidatePath(`/onboarding?token=${token}`);
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar step:", error);
    return { error: "Erro ao salvar dados." };
  }
};
