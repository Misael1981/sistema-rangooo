import {
  createAdditional,
  deleteAdditional,
  updateAdditional,
} from "@/app/_actions/create-additional";
import SubHeaderSteps from "@/components/SubHeaderSteps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/helpers/format-currency";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  PlusCircle,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CategorySummary = {
  id: string;
  name: string;
  additionalProducts: {
    id: string;
    name: string;
    price: number;
  }[];
};

type AdditionalProductsCardProps = {
  selectedCategory: CategorySummary | null;
  token: string;
};

const AdditionalProductsCard = ({
  selectedCategory,
  token,
}: AdditionalProductsCardProps) => {
  const [showList, setShowList] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleReset = () => {
    setEditingId(null);
    setName("");
    setPrice("");
  };

  const handleSubmit = async () => {
    const numPrice = Number(price);
    if (!name || isNaN(numPrice) || !selectedCategory?.id) return;

    try {
      let result;
      if (editingId) {
        // MODO EDIÇÃO
        result = await updateAdditional({
          additionalId: editingId,
          name,
          price: numPrice,
          token,
        });
      } else {
        // MODO CRIAÇÃO
        result = await createAdditional({
          name,
          price: numPrice,
          menuCategoryId: selectedCategory.id,
          token,
        });
      }

      if (result.success) {
        toast.success(
          editingId ? "Atualizado com sucesso!" : "Adicionado com sucesso!",
        );
        handleReset(); // Limpa o formulário e o editingId
      }
    } catch (error) {
      toast.error("Erro ao salvar.");
      console.error("Erro ao salvar:", error);
    }
  };

  const handleEditClick = (ing: {
    id: string;
    name: string;
    price: number;
  }) => {
    setEditingId(ing.id);
    setName(ing.name);
    setPrice(ing.price.toString());
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este adicional?")) return;
    const result = await deleteAdditional({
      additionalId: id,
      token,
    });
    if (result.success) toast.success("Item removido!");
  };

  return (
    <>
      <SubHeaderSteps
        tittle="Ingredientes Adicionais"
        subTittle={selectedCategory?.name}
        badges={selectedCategory?.additionalProducts.length}
        description="Os Ingredientes Adicionais são ingredientes extras que usuários podem adicionar em seus produtos."
      />
      <main className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Bacon Extra"
          />
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Preço (Ex: 5.00)"
          />

          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1">
              <PlusCircle className="mr-2 h-4 w-4" />
              {editingId ? "Salvar" : "Adicionar"}
            </Button>
            {editingId && (
              <Button
                variant="destructive"
                onClick={handleReset}
                title="Cancelar edição"
              >
                <X size={18} /> Cancelar
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center border-b gap-4 py-4">
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
              : `Ver Lista (${selectedCategory?.additionalProducts.length})`}
          </Button>
          {showList && (
            <ul className="w-full max-w-md space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              {selectedCategory?.additionalProducts.map((ing) => (
                <li
                  key={ing.id}
                  className="group flex items-center justify-between gap-6 rounded-md border bg-card p-3 transition-all hover:border-primary/50"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium">{ing.name}</span>
                    <span className="text-xs text-green-600 font-semibold">
                      {formatCurrency(ing.price)}
                    </span>
                  </div>

                  <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditClick(ing)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(ing.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </li>
              ))}

              {selectedCategory?.additionalProducts.length === 0 && (
                <p className="text-center text-xs text-muted-foreground py-4">
                  Nenhum produto adicional cadastrado.
                </p>
              )}
            </ul>
          )}
        </div>
      </main>
    </>
  );
};

export default AdditionalProductsCard;
