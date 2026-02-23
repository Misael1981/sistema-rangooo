import { db } from "@/lib/prisma";

export const getOnboardingData = async (restaurantId: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: { id: restaurantId },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      avatarImageUrl: true,
      coverImageUrl: true,
      category: true,
      socialMedia: true,
      email: true,
      street: true,
      number: true,
      neighborhood: true,
      complement: true,
      city: true,
      state: true,
      zipCode: true,
      deliveryFee: true,
      onboardingStep: true,

      contacts: {
        select: { id: true, number: true, type: true, isPrimary: true },
      },
      paymentMethods: { select: { id: true, method: true, isActive: true } },
      consumptionMethods: {
        select: { id: true, method: true, isActive: true },
      },

      menuCategories: {
        select: {
          id: true,
          name: true,
          displayOrder: true,
          products: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              imageUrl: true,
            },
          },
          additionalIngredients: {
            select: { id: true, name: true, price: true },
          },
        },
      },
    },
  });

  if (!restaurant) return null;

  return {
    id: restaurant.id,
    name: restaurant.name,
    slug: restaurant.slug,
    description: restaurant.description,
    avatarImageUrl: restaurant.avatarImageUrl,
    coverImageUrl: restaurant.coverImageUrl,
    category: restaurant.category,
    socialMedia: restaurant.socialMedia,
    email: restaurant.email,
    street: restaurant.street,
    number: restaurant.number,
    neighborhood: restaurant.neighborhood,
    complement: restaurant.complement,
    city: restaurant.city,
    state: restaurant.state,
    zipCode: restaurant.zipCode,
    deliveryFee: Number(restaurant.deliveryFee ?? 0),
    onboardingStep: Number(restaurant.onboardingStep),

    paymentMethods: restaurant.paymentMethods,
    consumptionMethods: restaurant.consumptionMethods,
    contacts: restaurant.contacts.map((c) => ({
      ...c,
      createdAt: new Date(),
      updatedAt: new Date(),
      restaurantId: restaurant.id,
      label: null,
    })),

    menuCategories: restaurant.menuCategories.map((category) => ({
      id: category.id,
      name: category.name,
      displayOrder: category.displayOrder,
      products: category.products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        imageUrl: p.imageUrl,
        price: Number(p.price),
      })),
      additionalIngredients: category.additionalIngredients.map((i) => ({
        id: i.id,
        name: i.name,
        price: Number(i.price),
      })),
    })),
  };
};
