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
  onSuccess: (newId: string) => void;
};

const Step1OwnerData = ({ token, data, onSuccess }: Step1OwnerDataProps) => {
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

    if (result.success && result.restaurantId) {
      toast.success("Dados salvos! Vamos configurar o estabelecimento.");
      onSuccess(result.restaurantId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Step 1 - Informações do Dono ou Responsável do Estabelecimento
        </CardTitle>
        <CardDescription>
          Nesta etapa coletamos as informações do proprietário do
          estabelecimento. Esses dados serão usados para criar sua conta de
          acesso ao Rangooo e garantir a segurança da plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="owner-form"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Salvando..." : "Próximo"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Step1OwnerData;
