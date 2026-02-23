import { ContactType } from "@prisma/client";

export type ProductDTO = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  ingredients: string[];
  menuCategoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type AdditionalProductDTO = {
  id: string;
  name: string;
  price: number;
};

export type ContactDTO = {
  id: string;
  number: string;
  label: string | null;
  type: ContactType;
  createdAt: Date;
  updatedAt: Date;
  restaurantId: string;
  isPrimary: boolean;
};

export type MenuCategoryDTO = {
  id: string;
  name: string;
  displayOrder: number;
  products: ProductDTO[];
  additionalProducts: AdditionalProductDTO[];
};

export type RestaurantFullDTO = {
  id: string;
  name: string;
  contacts: ContactDTO[];
  menuCategories: MenuCategoryDTO[];
};
