import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import CardCategories from "./components/CardCategories";
import { RestaurantFullDTO } from "@/dtos/restaurant-full-data.dto";
import SubHeaderSteps from "@/components/SubHeaderSteps";
import EstablishmentInfoCard from "./components/EstablishmentInfoCard";

type Step4ConfirmationProps = {
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
  restaurantFullData: RestaurantFullDTO | null;
};

const Step5Confirmation = ({
  onSuccess,
  onBack,
  restaurantFullData,
}: Step4ConfirmationProps) => {
  console.log(restaurantFullData);

  if (!restaurantFullData) {
    return <div>Carregando... ou Restaurante não encontrado.</div>;
  }

  const {
    name,
    email,
    slug,
    description,
    category,
    deliveryFee,
    street,
    number,
    neighborhood,
    city,
    state,
    contacts,
  } = restaurantFullData;

  const establishmentInfoCard = {
    name,
    email,
    slug,
    description,
    category,
    deliveryFee,
    street,
    number,
    neighborhood,
    city,
    state,
    contacts,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 4 - Revisão e Confirmação</CardTitle>
        <CardDescription>
          Revise todas as informações antes de finalizar. Após a confirmação,
          seu estabelecimento estará pronto para receber pedidos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <SubHeaderSteps tittle={name} />
        </div>
        <section>
          <EstablishmentInfoCard
            establishmentInfoCard={establishmentInfoCard}
          />
        </section>
        <section className="flex justify-center flex-wrap gap-4">
          {restaurantFullData?.menuCategories.map((cat) => (
            <CardCategories key={cat.id} data={cat} />
          ))}
        </section>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft />
          Voltar
        </Button>
        <Button onClick={onSuccess}>Confirmar</Button>
      </CardFooter>
    </Card>
  );
};

export default Step5Confirmation;
