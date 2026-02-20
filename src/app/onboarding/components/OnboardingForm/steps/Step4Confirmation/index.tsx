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
};

const Step4Confirmation = ({
  restaurantId,
  data,
  onSuccess,
  onBack,
}: Step4ConfirmationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 4 - Revisão e Confirmação</CardTitle>
        <CardDescription>
          Revise todas as informações antes de finalizar. Após a confirmação,
          seu estabelecimento estará pronto para receber pedidos.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
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

export default Step4Confirmation;
