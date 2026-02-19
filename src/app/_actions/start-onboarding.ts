"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function startOnboarding(
  token: string,
  values: { name: string; email: string; phone: string },
) {
  try {
    const invite = await db.enrollmentInvite.findUnique({
      where: { token },
      include: { lead: true },
    });

    if (!invite || invite.usedAt) {
      return { error: "Convite inválido ou já utilizado." };
    }

    const owner = await db.user.upsert({
      where: { email: values.email },
      update: {
        name: values.name,
        role: "RESTAURANT_OWNER",
      },
      create: {
        email: values.email,
        name: values.name,
        role: "RESTAURANT_OWNER",
      },
    });

    let restaurant = await db.restaurant.findFirst({
      where: {
        ownerId: owner.id,
        name: invite.lead.restaurantName,
      },
    });

    if (restaurant) {
      restaurant = await db.restaurant.update({
        where: { id: restaurant.id },
        data: {
          onboardingStep: 2,
        },
      });
    } else {
      restaurant = await db.restaurant.create({
        data: {
          name: invite.lead.restaurantName,
          ownerId: owner.id,
          slug: `${invite.lead.restaurantName.toLowerCase().replace(/\s+/g, "-")}-${Math.random().toString(36).substring(7)}`,
          onboardingStep: 2,
          latitude: 0,
          longitude: 0,
        },
      });

      await db.leadApplication.update({
        where: { id: invite.leadId },
        data: {
          name: values.name,
          email: values.email,
          phone: values.phone,
        },
      });
    }

    revalidatePath("/onboarding");

    return {
      success: true,
      restaurantId: restaurant.id,
      ownerId: owner.id,
    };
  } catch (error) {
    console.error("Erro no StartOnboarding:", error);
    return { error: "Erro ao processar seus dados. Tente novamente." };
  }
}
