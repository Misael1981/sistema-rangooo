import { getRestaurantMenuById } from "@/data/get-menu-category-by-id";
import { RestaurantCategory } from "@misael1981/rangooo-database";

export type MenuWithProducts = Awaited<
  ReturnType<typeof getRestaurantMenuById>
>;

export interface OwnerData {
  name: string;
  phone: string;
  email: string;
}

export interface GeneralInformationProps {
  name: string;
  category: typeof RestaurantCategory;
  slug: string;
  id: string;
}

export interface Products {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  ingredients: string[];
}

export interface AdditionalIngredient {
  id: string;
  name: string;
  price: number;
}

export interface MenuCategoryData {
  id: string;
  name: string;
  displayOrder: number;
  productsCount: number;
  products: Products[];
  additionalIngredients: AdditionalIngredient[];
}

export interface MenuCategoryWithProductsDTO {
  id: string;
  name: string;
  products: {
    id: string;
    name: string;
    price: number;
    description: string | null;
    imageUrl: string | null;
    ingredients: string[];
  }[];
}

export interface MenuProductWithCategoryDTO {
  id: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  ingredients: string[];
}

export type TimeSlotType = "BREAKFAST" | "LUNCH" | "DINNER" | "SPECIAL";

export interface TimeSlot {
  type: TimeSlotType;
  open: string;
  close: string;
}

export interface BusinessDay {
  isClosed: boolean;
  timeSlots: TimeSlot[];
}

export interface OpeningHoursFormValues {
  openingHours: {
    businessHours: BusinessDay[];
  };
}
