import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Step2EstablishmentDataProps = {
  restaurantId?: string;
  data: {
    name: string;
    email: string;
    restaurantName: string;
    phone: string;
    onboardingStep?: number;
  };
  onSuccess: () => void;
  onBack: () => void;
};

const Step2EstablishmentData = ({
  restaurantId,
  data,
  onSuccess,
  onBack,
}: Step2EstablishmentDataProps) => {
  console.log("Step2EstablishmentData: ", data);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 2 - Informações do Estabelecimento</CardTitle>
        <CardDescription>
          Agora vamos configurar os dados do seu estabelecimento, como nome,
          endereço, identidade visual e link personalizado... Essas informações
          serão exibidas para seus clientes.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
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

export default Step2EstablishmentData;
