"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  generalInfoSchema,
  establishmentAddressSchema,
  establishmentContactInfoSchema,
  gallerySchema,
} from "@/schemas/onboarding-schema";

type Step = "general" | "address" | "contacts" | "gallery";

export async function saveEstablishmentData(
  restaurantId: string,
  step: Step,
  data: unknown,
) {
  try {
    if (!restaurantId) {
      return { error: "Restaurante não encontrado." };
    }

    switch (step) {
      case "general": {
        const parsed = generalInfoSchema.parse(data);

        await db.restaurant.update({
          where: { id: restaurantId },
          data: {
            name: parsed.name,
            slug: parsed.slug,
            category: parsed.category,
            description: parsed.description,
            onboardingStep: 2,
          },
        });

        break;
      }

      case "address": {
        const parsed = establishmentAddressSchema.parse(data);

        await db.restaurant.update({
          where: { id: restaurantId },
          data: {
            ...parsed,
            onboardingStep: 3,
          },
        });

        break;
      }

      case "contacts": {
        const parsed = establishmentContactInfoSchema.parse(data);

        await db.restaurant.update({
          where: { id: restaurantId },
          data: {
            email: parsed.email,
            socialMedia: parsed.socialMedia,
            onboardingStep: 4,
          },
        });

        // aqui você pode tratar contatos em tabela separada se existir
        break;
      }

      case "gallery": {
        const parsed = gallerySchema.parse(data);

        await db.restaurant.update({
          where: { id: restaurantId },
          data: {
            avatarImageUrl: parsed.avatarImageUrl,
            coverImageUrl: parsed.coverImageUrl,
            onboardingStep: 5,
          },
        });

        break;
      }
    }

    revalidatePath("/onboarding");

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar step:", error);
    return { error: "Erro ao salvar dados." };
  }
}
