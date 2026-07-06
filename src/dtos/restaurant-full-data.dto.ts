import { ContactType } from "@misael1981/rangooo-database";

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

export type ConsumptionMethodsDTO = {
  id: string;
  method: string;
  isActive: boolean;
};

export type PaymentMethodsDTO = {
  id: string;
  method: string;
  isActive: boolean;
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

export type TimeSlotDTO = {
  close: string;
  open: string;
};

export type BusinessHoursDTO = {
  id: string;
  dayOfWeek: number;
  isClosed: boolean;
  timeSlots: TimeSlotDTO[];
};

export type RestaurantFullDTO = {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  email: string | null;

  street: string | null;
  number: string | null;
  neighborhood: string | null;
  complement: string | null;
  city: string | null;
  state: string | null;

  avatarImageUrl: string | null;

  category: string;
  deliveryFee: number | null;

  businessHours: BusinessHoursDTO[];
  paymentMethods: PaymentMethodsDTO[];
  consumptionMethods: ConsumptionMethodsDTO[];
  socialMedia: string[] | null;
  contacts: ContactDTO[];
  menuCategories: MenuCategoryDTO[];
};
