import SubHeaderSteps from "@/components/SubHeaderSteps";
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

type Step3ConsumptionMethodsAndSchedulesProps = {
  onSuccess: () => void;
  onBack: () => void;
  restaurantId?: string;
};

const Step3ConsumptionMethodsAndSchedules = ({
  onSuccess,
  onBack,
  restaurantId,
}: Step3ConsumptionMethodsAndSchedulesProps) => {
  console.log(restaurantId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Step 3 - Métodos de Consumo e Horários de Funcionamento
        </CardTitle>
        <CardDescription>
          Nesta seção você irá definir seu horário de funcionamento e os métodos
          de consumo que você que terá na sua página.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SubHeaderSteps tittle="Métodos de Consumo" />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft />
          Voltar
        </Button>
        <Button onClick={onSuccess}>Confirmar</Button>
      </CardFooter>
    </Card>
  );
};

export default Step3ConsumptionMethodsAndSchedules;
