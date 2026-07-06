import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { menuReducer } from "@/reducers/menuReducer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useReducer } from "react";
import MenuCategoriesList from "./components/MenuCategoriesList";
import { MenuCategoryData, Products } from "@/dtos/onboarding.dto";
import SelectedTableName from "./components/SelectedTableName";
import AdditionalProductsCard from "./components/AdditionalProductsCard";
import ProductsListSession from "./components/ProductsListSession";
import { RestaurantOnboardingDTO } from "@/dtos/restaurant-onboarding.dto";

export type MenuAction =
  | { type: "SET_CATEGORIES"; payload: MenuCategoryData[] }
  | { type: "SELECT_CATEGORY"; payload: string }
  | { type: "REMOVE_CATEGORY"; payload: string }
  | { type: "ADD_PRODUCT"; payload: { categoryId: string; product: Products } };

type Step3MenuEstablishmentDataProps = {
  restaurantId?: string | null;
  data: {
    name: string;
    email: string;
    restaurantName: string;
    phone: string;
    onboardingStep?: number;
  };
  onSuccess: () => void;
  onBack: () => void;
  initialRestaurantData: RestaurantOnboardingDTO | null;
  menuCategories: MenuCategoryData[] | null;
  token: string;
};

const Step4MenuEstablishmentData = ({
  restaurantId,
  onSuccess,
  onBack,
  menuCategories,
  token,
}: Step3MenuEstablishmentDataProps) => {
  const [state, dispatch] = useReducer(menuReducer, {
    categories: menuCategories ?? [],
    selectedCategoryId:
      menuCategories && menuCategories.length > 0 ? menuCategories[0].id : null,
  });

  useEffect(() => {
    if (menuCategories) {
      dispatch({ type: "SET_CATEGORIES", payload: menuCategories });
    }
  }, [menuCategories]);

  if (!menuCategories) {
    return <div>O cardápio ainda está sendo montado ou não existe.</div>;
  }

  const handleSelectCategory = (id: string) => {
    dispatch({ type: "SELECT_CATEGORY", payload: id });
  };

  const handleDeleteCategory = (id: string) => {
    dispatch({ type: "REMOVE_CATEGORY", payload: id });
  };

  const categoriesSummary = menuCategories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    productsCount: cat.products?.length ?? 0,
  }));

  const additionalProductsCategory = menuCategories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    additionalProducts:
      cat.additionalIngredients?.map((ing) => ({
        ...ing,
        price: Number(ing.price),
      })) || [],
  }));

  const selectedCategory =
    additionalProductsCategory.find(
      (cat) => cat.id === state.selectedCategoryId,
    ) ?? null;

  const productsCategory = menuCategories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    products:
      cat.products?.map((prod) => ({
        ...prod,
        price: Number(prod.price),
      })) || [],
  }));

  const selectedProductsCategory =
    productsCategory.find((cat) => cat.id === state.selectedCategoryId) ?? null;

  return (
    <Card className="border-none">
      <CardHeader className="p-0">
        <CardTitle>Step 3 - Cardápio e Produtos</CardTitle>
        <CardDescription>
          Monte seu cardápio adicionando categorias e produtos. Esses são os
          itens que ficarão disponíveis para seus clientes realizarem pedidos.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-100 space-y-8 p-0 border-none">
        <MenuCategoriesList
          categories={categoriesSummary}
          onSelect={handleSelectCategory}
          onDelete={handleDeleteCategory}
          selectedCategoryId={state.selectedCategoryId ?? ""}
          restaurantId={restaurantId ?? ""}
          token={token}
        />

        <SelectedTableName
          selectedCategoryId={state.selectedCategoryId ?? ""}
          categories={categoriesSummary}
        />

        <AdditionalProductsCard
          selectedCategory={selectedCategory}
          token={token}
        />

        <ProductsListSession
          selectedProductsCategory={selectedProductsCategory}
          token={token}
          restaurantId={restaurantId ?? ""}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft />
          Voltar
        </Button>
        <Button onClick={onSuccess}>
          Próximo
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Step4MenuEstablishmentData;
