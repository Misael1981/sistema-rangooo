"use server";

import { db } from "@/lib/prisma";

function generateSlug(name: string) {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  const random = Math.random().toString(36).substring(2, 6);

  return `${base}-${random}`;
}

export async function startOnboarding(
  token: string,
  values: { name: string; email: string; phone: string },
) {
  try {
    const invite = await db.enrollmentInvite.findUnique({
      where: { token },
      include: { lead: true },
    });

    if (!invite) {
      return { error: "Convite inválido." };
    }

    if (invite.usedAt) {
      return { error: "Este convite já foi utilizado." };
    }

    // 1️⃣ Criar ou atualizar usuário
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

    let restaurant;

    // 2️⃣ Se o invite já estiver vinculado a um restaurante, usamos ele
    if (invite.restaurantId) {
      restaurant = await db.restaurant.findUnique({
        where: { id: invite.restaurantId },
      });

      if (!restaurant) {
        return { error: "Restaurante vinculado não encontrado." };
      }
    } else {
      // 3️⃣ Criar restaurante novo
      restaurant = await db.restaurant.create({
        data: {
          name: invite.lead.restaurantName,
          ownerId: owner.id,
          slug: generateSlug(invite.lead.restaurantName),
          onboardingStep: 2,
        },
      });

      // 4️⃣ Vincular restaurante ao invite
      await db.enrollmentInvite.update({
        where: { id: invite.id },
        data: {
          restaurantId: restaurant.id,
        },
      });

      // 5️⃣ Criar vínculo na tabela RestaurantUser
      await db.restaurantUser.create({
        data: {
          userId: owner.id,
          restaurantId: restaurant.id,
          role: "OWNER",
        },
      });
    }

    return {
      success: true,
      restaurantId: restaurant.id,
      ownerId: owner.id,
    };
  } catch (error) {
    console.error("Erro no startOnboarding:", error);
    return { error: "Erro ao iniciar o onboarding." };
  }
}
