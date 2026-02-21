import { db } from "@/lib/prisma";

export const getRestaurantMenuById = async (restaurantId: string) => {
  const categories = await db.menuCategory.findMany({
    where: {
      restaurant: { id: restaurantId },
    },
    include: {
      _count: {
        select: { products: true },
      },
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          description: true,
          ingredients: true,
        },
        orderBy: { name: "asc" },
      },
      additionalIngredients: true,
    },
    orderBy: { displayOrder: "asc" },
  });
  const menuCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    displayOrder: cat.displayOrder,
    productsCount: cat._count.products,

    products: cat.products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: Number(p.price),
      imageUrl: p.imageUrl,
      ingredients: p.ingredients,
    })),

    additionalIngredients: cat.additionalIngredients.map((i) => ({
      id: i.id,
      name: i.name,
      price: Number(i.price),
    })),
  }));
  return menuCategories;
};
