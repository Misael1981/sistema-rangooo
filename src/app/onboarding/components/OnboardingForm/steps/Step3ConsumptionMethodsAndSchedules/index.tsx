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
import { ArrowLeft, ArrowRight } from "lucide-react";
import MethodsSection from "./components/MethodsSection";
import {} from "@prisma/client";
import {
  BusinessHourDTO,
  ConsumptionMethodDTO,
  PaymentMethodDTO,
  TimeSlotDTO,
} from "@/dtos/restaurant-onboarding.dto";
import OpeningHours from "./components/OpeningHours";
import {
  BusinessHoursFormData,
  businessHoursSchema,
} from "@/schemas/business-hours-schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { updateRestaurantMethods } from "@/app/_actions/update-restaurant-methods";
import { toast } from "sonner";

type Step3ConsumptionMethodsAndSchedulesProps = {
  onSuccess: () => void;
  onBack: () => void;
  restaurantId?: string;
  consumptionMethods: ConsumptionMethodDTO[];
  paymentMethods: PaymentMethodDTO[];
  businessHours: BusinessHourDTO[] | null;
  deliveryFee: number;
  token: string;
};

const Step3ConsumptionMethodsAndSchedules = ({
  onSuccess,
  onBack,
  restaurantId,
  consumptionMethods,
  paymentMethods,
  deliveryFee,
  token,
  businessHours,
}: Step3ConsumptionMethodsAndSchedulesProps) => {
  const formattedHours = useMemo(
    () =>
      (businessHours ?? [])
        .map((bh) => ({
          dayOfWeek: bh.dayOfWeek,
          isClosed: bh.isClosed,
          timeSlots: (bh.timeSlots as TimeSlotDTO[]) ?? [],
        }))
        .sort((a, b) => a.dayOfWeek - b.dayOfWeek),
    [businessHours],
  );

  const defaultWeek = Array.from({ length: 7 }, (_, index) => ({
    dayOfWeek: index,
    isClosed: true,
    timeSlots: [],
  }));

  const mergedWeek = defaultWeek.map((defaultDay) => {
    const fromDb = formattedHours.find(
      (d) => d.dayOfWeek === defaultDay.dayOfWeek,
    );
    return fromDb ?? defaultDay;
  });

  const methods = useForm<BusinessHoursFormData>({
    resolver: zodResolver(businessHoursSchema),
    defaultValues: {
      businessHours: mergedWeek,
    },
  });

  useEffect(() => {
    if (formattedHours.length > 0) {
      methods.reset({
        businessHours: formattedHours,
      });
    }
  }, [formattedHours, methods.reset]);

  const {
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: BusinessHoursFormData) => {
    if (!restaurantId) return;

    try {
      const result = await updateRestaurantMethods(
        data,
        restaurantId,
        token,
        "schedules",
      );

      if (result.success) {
        toast.success("Configurações atualizadas com sucesso!");
      } else {
        toast.error("Erro ao salvar.");
      }
    } catch (error) {
      toast.error("Erro crítico ao salvar.");
      console.error(error);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader className="p-0">
        <CardTitle>
          Step 3 - Métodos de Consumo e Horários de Funcionamento
        </CardTitle>
        <CardDescription>
          Nesta seção você irá definir seu horário de funcionamento e os métodos
          de consumo que você que terá na sua página.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <SubHeaderSteps tittle="Métodos de Consumo" />

        <MethodsSection
          consumptionMethods={consumptionMethods}
          paymentMethods={paymentMethods}
          restaurantId={restaurantId ?? ""}
          deliveryFee={deliveryFee}
          token={token}
        />

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit, (errors) =>
              console.log("Erros do Zod:", errors),
            )}
          >
            <OpeningHours />
            <div className="w-full flex justify-center">
              <Button
                className="w-full max-w-md"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar Horários"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button variant="outline" onClick={onBack}>
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

export default Step3ConsumptionMethodsAndSchedules;
