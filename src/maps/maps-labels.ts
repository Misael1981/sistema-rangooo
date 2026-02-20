import { RestaurantCategory } from "@prisma/client";

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
