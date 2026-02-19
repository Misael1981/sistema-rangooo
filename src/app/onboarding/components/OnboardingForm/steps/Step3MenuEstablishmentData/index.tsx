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

type Step3MenuEstablishmentDataProps = {
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

const Step3MenuEstablishmentData = ({
  restaurantId,
  data,
  onSuccess,
  onBack,
}: Step3MenuEstablishmentDataProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 3 - Cardápio e Produtos</CardTitle>
        <CardDescription>
          Monte seu cardápio adicionando categorias e produtos. Esses são os
          itens que ficarão disponíveis para seus clientes realizarem pedidos.
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

export default Step3MenuEstablishmentData;
