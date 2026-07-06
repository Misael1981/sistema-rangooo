import {
  PLAN,
  type PlanType,
  RESTAURANT_CATEGORY,
  type RestaurantCategory,
} from "@/constants/domain";

export const CATEGORY_LABELS: Record<RestaurantCategory, string> = {
  RESTAURANT: "Restaurante",
  PIZZARIA: "Pizzaria",
  HAMBURGUERIA: "Hamburgueria",
  SORVETERIA: "Sorveteria",
  ADEGA: "Adega",
};

export const PLANS_RESTAURANT: Record<PlanType, string> = {
  [PLAN.BASICO]: "Básico",
  [PLAN.PRO]: "Pró",
};
