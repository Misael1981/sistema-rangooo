export const PLAN = {
  BASICO: "BASICO",
  PRO: "PRO",
} as const;

export type PlanType = (typeof PLAN)[keyof typeof PLAN];

export const RESTAURANT_CATEGORY = {
  RESTAURANT: "RESTAURANT",
  PIZZARIA: "PIZZARIA",
  HAMBURGUERIA: "HAMBURGUERIA",
  SORVETERIA: "SORVETERIA",
  ADEGA: "ADEGA",
} as const;

export type RestaurantCategory =
  (typeof RESTAURANT_CATEGORY)[keyof typeof RESTAURANT_CATEGORY];

export const CONTACT = {
  PHONE: "PHONE",
  WHATSAPP: "WHATSAPP",
} as const;

export type ContactType = (typeof CONTACT)[keyof typeof CONTACT];

export const AREA = {
  URBAN: "URBAN",
  RURAL: "RURAL",
  DISTRICT: "DISTRICT",
} as const;

export type AreaType = (typeof AREA)[keyof typeof AREA];
