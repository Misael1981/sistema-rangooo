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
import MethodsAndSchedules from "./components/MethodsAndSchedules";
import { finalizeOnboarding } from "@/app/_actions/finalize-onboarding";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
  token: string;
};

const Step5Confirmation = ({
  onBack,
  restaurantFullData,
  token,
}: Step4ConfirmationProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (!restaurantFullData) {
    return <div>Carregando... ou Restaurante não encontrado.</div>;
  }

  const {
    id,
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
    consumptionMethods,
    paymentMethods,
    businessHours,
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

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await finalizeOnboarding(id, token);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      router.push(`/onboarding/sucesso?id=${id}`);
    });
  };

  return (
    <Card className="border-none">
      <CardHeader className="p-0">
        <CardTitle>Step 4 - Revisão e Confirmação</CardTitle>
        <CardDescription>
          Revise todas as informações antes de finalizar. Após a confirmação,
          seu estabelecimento estará pronto para receber pedidos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-0">
        <div className="flex items-center justify-center">
          <SubHeaderSteps tittle={name} />
        </div>
        <section>
          <EstablishmentInfoCard
            establishmentInfoCard={establishmentInfoCard}
          />
        </section>
        <MethodsAndSchedules
          consumptionMethods={consumptionMethods}
          paymentMethods={paymentMethods}
          businessHours={businessHours}
        />

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
        <Button disabled={isPending} onClick={handleSubmit}>
          {isPending ? "Finalizando..." : "Concluir Cadastro"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Step5Confirmation;
