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
import { RestaurantOnboardingDTO } from "@/dtos/restaurant-onboarding.dto";

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
  restaurantFullData: RestaurantOnboardingDTO | null;
};

const Step5Confirmation = ({
  onSuccess,
  onBack,
  restaurantFullData,
}: Step4ConfirmationProps) => {
  console.log(restaurantFullData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 4 - Revisão e Confirmação</CardTitle>
        <CardDescription>
          Revise todas as informações antes de finalizar. Após a confirmação,
          seu estabelecimento estará pronto para receber pedidos.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
