import { PlanType, RestaurantCategory } from "@prisma/client";

export const CATEGORY_LABELS: Record<
  (typeof RestaurantCategory)[keyof typeof RestaurantCategory],
  string
> = {
  RESTAURANT: "Restaurante",
  PIZZARIA: "Pizzaria",
  HAMBURGUERIA: "Hamburgueria",
  SORVETERIA: "Sorveteria",
  ADEGA: "Adega",
};

export const PLANS_RESTAURANT: Record<PlanType, string> = {
  [PlanType.BASICO]: "Básico",
  [PlanType.PRO]: "Pró",
};
