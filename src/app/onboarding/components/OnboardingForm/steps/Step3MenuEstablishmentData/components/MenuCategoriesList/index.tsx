import SubHeaderSteps from "@/components/SubHeaderSteps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

const MenuCategoriesList = () => {
  return (
    <>
      <SubHeaderSteps
        tittle="Tabelas"
        description="As categorias do cardápio organizam os produtos do estabelecimento em seções estratégicas, como Pizzas Grandes, Bebidas e Prato do Dia... Facilitando a navegação e a experiência do cliente."
      />
      <div className="flex flex-col md:flex-row gap-2 ">
        <Input placeholder="Ex: Pizzas, Bebidas, Promoções..." />
        <div className="">
          <Button className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Tabela
          </Button>
        </div>
      </div>
    </>
  );
};

export default MenuCategoriesList;
