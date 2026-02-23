export interface ContactDTO {
  id: string;
  number: string;
  type: string;
  isPrimary: boolean;
}

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

export interface RestaurantOnboardingDTO {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  avatarImageUrl: string | null;
  coverImageUrl: string | null;
  category: string;
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

  contacts: ContactDTO[];
  paymentMethods: PaymentMethodDTO[];
  consumptionMethods: ConsumptionMethodDTO[];

  menuCategories: MenuCategoryDTO[];
}
