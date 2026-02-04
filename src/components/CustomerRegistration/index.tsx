"use client";

import { formSchema } from "@/schemas/lead-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import z from "zod";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { submitApplication } from "@/app/_actions/apply";

type FormValues = z.infer<typeof formSchema>;

const CustomerRegistration = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      restaurantName: "",
      city: "",
      state: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const result = await submitApplication(data);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Solicitação enviada! Entraremos em contato em breve.");
    form.reset();
  };

  return (
    <section className="mx-auto  w-full max-w-2xl">
      <Card className=" border border-orange-500 p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Cadastro do Estabelecimento
          </CardTitle>
          <CardDescription>
            Preencha os dados abaixo para começar seus 7 dias grátis no Rangooo
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 sm:px-4">
          <form
            id="initial-registration"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Nome Completo *</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu nome..."
                      autoComplete="off"
                    />
                    <FieldDescription>
                      Nome do proprietário ou responsável pelo estabelecimento.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email *</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="seuemail@exemplo.com"
                      autoComplete="off"
                      type="email"
                    />
                    <FieldDescription>
                      Usaremos para contato e acesso ao sistema
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phone">Telefone/WhatsApp *</FieldLabel>
                    <Input
                      {...field}
                      id="phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="(99) 99999-9999"
                      autoComplete="off"
                      value={formatPhoneNumber(field.value)}
                    />
                    <FieldDescription>
                      Número para contato da nossa equipe
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="restaurantName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="restaurantName">
                      Nome do Estabelecimento *
                    </FieldLabel>
                    <Input
                      {...field}
                      id="restaurantName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ex: Restaurante do Zé, Pizzaria Bella Pizza..."
                      autoComplete="off"
                    />
                    <FieldDescription>
                      Nome do seu estabelecimento.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div>
                <div className="flex gap-2">
                  <div className="sm:w-3/4 w-2/3">
                    <Controller
                      name="city"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="city">Cidade *</FieldLabel>
                          <Input
                            {...field}
                            id="city"
                            aria-invalid={fieldState.invalid}
                            placeholder="Sua cidade"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className="sm:w-1/4 w-1/3">
                    <Controller
                      name="state"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="state">Estado (UF) *</FieldLabel>
                          <Input
                            {...field}
                            id="state"
                            aria-invalid={fieldState.invalid}
                            placeholder="Ex: SP..."
                            autoComplete="off"
                            maxLength={2}
                            className="uppercase"
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/[^a-zA-Z]/g, "")
                                .toUpperCase()
                                .slice(0, 2);

                              field.onChange(value);
                            }}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>
                <FieldDescription>
                  Cidade e estado onde está localizado o seu estabelecimento.
                </FieldDescription>
              </div>
              <Controller
                name="notes"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="notes">Alguma observação?</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="notes"
                        placeholder="Conte-nos mais sobre o seu estabelecimento."
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value?.length || 0}/100 caracteres
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Opcional - Mas nos ajuda a entender melhor seu negócio.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-2">
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="initial-registration"
              className="w-full"
            >
              Enviar
            </Button>
          </Field>
          <p className="text-center text-sm text-gray-500">
            Nossa equipe entrará em contato em breve
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default CustomerRegistration;
