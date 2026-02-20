import { RestaurantCategory } from "@prisma/client";

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
