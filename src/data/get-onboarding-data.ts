import { db } from "@/lib/prisma";

export const getOnboardingData = async (restaurantId: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: { id: restaurantId },
    include: {
      menuCategories: {
        include: {
          additionalIngredients: true,
          products: true,
        },
      },
      contacts: true,
    },
  });

  if (!restaurant) return null;

  return {
    ...restaurant,
    menuCategories: restaurant.menuCategories.map((category) => ({
      id: category.id,
      name: category.name,
      displayOrder: category.displayOrder,
      products: category.products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        ingredients: product.ingredients,
        menuCategoryId: product.menuCategoryId,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      })),
      additionalProducts: category.additionalIngredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        price: Number(ingredient.price),
      })),
    })),
  };
};
