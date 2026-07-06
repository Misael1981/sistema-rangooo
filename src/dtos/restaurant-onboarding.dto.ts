import { $Enums } from "@misael1981/rangooo-database";

export interface ContactDTO {
  number: string;
  type: $Enums.ContactType;
  isPrimary: boolean;
  id: string;
  restaurantId: string;
  label: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ContactTypeDTO = "PHONE" | "WHATSAPP";

export interface PaymentMethodDTO {
  id: string;
  method: string;
  isActive: boolean;
}

export interface ConsumptionMethodDTO {
  id: string;
  method: string;
  isActive: boolean;
}

export interface ProductDTO {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
}

export interface AdditionalIngredientDTO {
  id: string;
  name: string;
  price: number;
}

export interface MenuCategoryDTO {
  id: string;
  name: string;
  displayOrder: number;
  products: ProductDTO[];
  additionalIngredients: AdditionalIngredientDTO[];
}

export interface TimeSlotDTO {
  type: "BREAKFAST" | "LUNCH" | "DINNER" | "SPECIAL";
  open: string;
  close: string;
}

export interface BusinessHourDTO {
  id: string;
  dayOfWeek: number;
  isClosed: boolean;
  timeSlots: TimeSlotDTO[];
}

export type AreaTypeDTO = "URBAN" | "RURAL" | "DISTRICT";

export interface RestaurantOnboardingDTO {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  avatarImageUrl: string | null;
  coverImageUrl: string | null;
  category: string;
  plan: string;
  socialMedia: unknown | null;
  email: string | null;
  street: string | null;
  number: string | null;
  neighborhood: string | null;
  complement: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  deliveryFee: number | null;

  businessHours: BusinessHourDTO[];
  contacts: ContactDTO[];
  paymentMethods: PaymentMethodDTO[];
  consumptionMethods: ConsumptionMethodDTO[];

  menuCategories: MenuCategoryDTO[];
}
