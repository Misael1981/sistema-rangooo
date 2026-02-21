import SubHeaderSteps from "@/components/SubHeaderSteps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import MenuTableCard from "../MenuTableCard";
import { useRef } from "react";
import { toast } from "sonner";
import { createCategory, deleteCategory } from "@/app/_actions/create-category";

type CategorySummary = {
  id: string;
  name: string;
  productsCount: number;
};

type MenuCategoriesListProps = {
  categories: CategorySummary[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  selectedCategoryId: string;
  restaurantId: string;
  token: string;
};

const MenuCategoriesList = ({
  categories,
  onSelect,
  onDelete,
  selectedCategoryId,
  restaurantId,
  token,
}: MenuCategoriesListProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddCategory = async () => {
    const name = inputRef.current?.value;

    if (!name || name.trim().length < 3) {
      return toast.error("O nome da tabela deve ter pelo menos 3 caracteres.");
    }

    try {
      const result = await createCategory({
        name,
        restaurantId,
        token,
      });

      if (result.success) {
        toast.success("Tabela criada com sucesso!");
        if (inputRef.current) inputRef.current.value = ""; // Limpa o campo
      } else {
        toast.error(result.error || "Erro ao criar categoria.");
      }
    } catch (error) {
      toast.error("Erro crítico de conexão.");
      console.error("Erro ao criar categoria:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const result = await deleteCategory(id, token);

      if (result.success) {
        onDelete(id);
        toast.success("Tabela excluída com sucesso!");
      } else {
        toast.error("Erro ao excluir categoria.");
      }
    } catch (error) {
      toast.error("Erro crítico de conexão.");
      console.error("Erro ao excluir categoria:", error);
    }
  };

  return (
    <>
      <SubHeaderSteps
        badges={categories.length}
        tittle="Tabelas"
        description="As categorias do cardápio organizam os produtos do estabelecimento em seções estratégicas, como Pizzas Grandes, Bebidas e Prato do Dia... Facilitando a navegação e a experiência do cliente."
      />
      <main className="space-y-6">
        <div className="flex flex-col md:flex-row gap-2 ">
          <Input
            ref={inputRef}
            placeholder="Ex: Pizzas, Bebidas, Promoções..."
          />
          <div className="">
            <Button onClick={handleAddCategory}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Tabela
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {categories.map((cat) => (
            <MenuTableCard
              key={cat.id}
              table={cat}
              onSelect={onSelect}
              onDelete={handleDeleteCategory}
              selectedCategoryId={selectedCategoryId}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default MenuCategoriesList;
