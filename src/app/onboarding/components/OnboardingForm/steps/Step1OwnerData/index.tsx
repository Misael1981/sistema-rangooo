"use client";

import { startOnboarding } from "@/app/_actions/start-onboarding";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { ownerSchema } from "@/schemas/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type Step1OwnerDataProps = {
  token: string;
  data: {
    name: string;
    email: string;
    restaurantName: string;
    phone: string;
    onboardingStep?: number;
  };
  onSuccess: (id: string, updatedValues: z.infer<typeof ownerSchema>) => void;
  nextStep: () => void;
};

const Step1OwnerData = ({
  token,
  data,
  onSuccess,
  nextStep,
}: Step1OwnerDataProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof ownerSchema>>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ownerSchema>) => {
    const result = await startOnboarding(token, values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    if (result.success) {
      toast.success("Dados salvos! Vamos configurar o estabelecimento.");
      router.refresh();
      onSuccess(result.restaurantId, values);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader className="p-0">
        <CardTitle>
          Step 1 - Informações do Dono ou Responsável do Estabelecimento
        </CardTitle>
        <CardDescription>
          Nesta etapa coletamos as informações do proprietário do
          estabelecimento. Esses dados serão usados para criar sua conta de
          acesso ao Rangooo e garantir a segurança da plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent className=" p-0">
        <form id="owner-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Nome do responsável</FieldLabel>
              <Input {...form.register("name")} />
              {form.formState.errors.name && (
                <span className="text-xs text-red-500">
                  {form.formState.errors.name.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>Telefone</FieldLabel>
              <Input
                {...form.register("phone")}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  const formattedValue = formatPhoneNumber(rawValue);
                  form.setValue("phone", formattedValue, {
                    shouldValidate: true,
                  });
                }}
              />
              {form.formState.errors.phone && (
                <span className="text-xs text-red-500">
                  {form.formState.errors.phone.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>E-mail</FieldLabel>
              <Input {...form.register("email")} />
              <FieldDescription>
                O e-mail informado será usado como login de acesso ao sistema.
                Certifique-se de utilizar um Gmail válido e ativo.
              </FieldDescription>

              {form.formState.errors.email && (
                <span className="text-xs text-red-500">
                  {form.formState.errors.email.message}
                </span>
              )}
            </Field>
          </FieldGroup>
          <div className="w-full my-6">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? "Salvando..." : "Editar dados"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          disabled={form.formState.isSubmitting}
          type="button"
          onClick={nextStep}
        >
          <ArrowRight className="ml-2 h-4 w-4" /> Próximo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Step1OwnerData;
