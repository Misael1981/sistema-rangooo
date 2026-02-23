import SubHeaderSteps from "@/components/SubHeaderSteps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MenuCategoryWithProductsDTO,
  MenuProductWithCategoryDTO,
} from "@/dtos/onboarding.dto";
import { formatCurrency } from "@/helpers/format-currency";
import {
  ChevronDown,
  ChevronUp,
  CirclePlus,
  Edit,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import DialogAddProduct from "../DialogAddProduct";
import { toast } from "sonner";
import { deleteProduct } from "@/app/_actions/upsert-product";

type ProductsListSessionProps = {
  selectedProductsCategory: MenuCategoryWithProductsDTO | null;
  token: string;
  restaurantId: string;
};

const ProductsListSession = ({
  selectedProductsCategory,
  token,
  restaurantId,
}: ProductsListSessionProps) => {
  const [showList, setShowList] = useState(false);
  const [dialogAddProductOpen, setDialogAddProductOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] =
    useState<MenuProductWithCategoryDTO | null>(null);

  if (!selectedProductsCategory) {
    return null;
  }

  if (!selectedProductsCategory) {
    return null;
  }

  const filteredProducts = selectedProductsCategory.products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEditProduct = (product: MenuProductWithCategoryDTO) => {
    setSelectedProduct(product);
    setDialogAddProductOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      const result = await deleteProduct(id, token);
      if (result.success) {
        toast.success("Produto removido com sucesso!");
      } else {
        toast.error(result.error);
      }
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setDialogAddProductOpen(true);
  };

  return (
    <>
      <SubHeaderSteps
        tittle="Produtos"
        subTittle={selectedProductsCategory?.name}
        badges={selectedProductsCategory?.products?.length}
        description="Produtos que serão exibidos nessa tabela."
      />
      <section className="space-y-6">
        <div className="flex justify-end w-full">
          <Button onClick={handleAddProduct}>
            <CirclePlus size={16} />
            Adicionar Produto
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2  w-full">
          <div className="flex items-center justify-center gap-2 max-w-lg w-full">
            <Input
              placeholder="Buscar produto"
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button>
              <Search size={16} />
            </Button>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center border-b gap-4 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowList((prev) => !prev)}
          className="text-muted-foreground hover:text-primary"
        >
          {showList ? (
            <ChevronUp className="mr-2" size={16} />
          ) : (
            <ChevronDown className="mr-2" size={16} />
          )}
          {showList
            ? "Ocultar Lista"
            : `Ver Lista (${selectedProductsCategory.products.length})`}
        </Button>
      </section>
      <section className="w-full flex items-center justify-center">
        {showList && (
          <ul className="w-full max-w-md space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            {filteredProducts.map((p) => (
              <li
                key={p.id}
                className="group flex items-center justify-between gap-6 rounded-md border bg-card p-3 transition-all hover:border-primary/50"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="text-xs text-green-600 font-semibold">
                    {formatCurrency(p.price)}
                  </span>
                </div>
                <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditProduct(p)}
                    className="h-8 w-8"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </li>
            ))}

            {filteredProducts.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum produto encontrado.
              </p>
            )}
          </ul>
        )}
      </section>
      <DialogAddProduct
        dialogAddProductOpen={dialogAddProductOpen}
        setDialogAddProductOpen={setDialogAddProductOpen}
        product={selectedProduct}
        selectedCategoryName={selectedProductsCategory.name}
        selectedCategoryId={selectedProductsCategory.id}
        token={token}
        restaurantId={restaurantId}
      />
    </>
  );
};

export default ProductsListSession;
