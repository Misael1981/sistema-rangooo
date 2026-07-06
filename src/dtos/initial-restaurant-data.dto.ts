import { RestaurantCategory } from "@misael1981/rangooo-database";

export interface initialRestaurantData {
  number: string | null;
  name: string;
  email: string | null;
  category: RestaurantCategory;
  slug: string;
  description: string | null;
  street: string | null;
  neighborhood: string | null;
  complement: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  socialMedia: string | null;
  avatarImageUrl: string | null;
  coverImageUrl: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}
