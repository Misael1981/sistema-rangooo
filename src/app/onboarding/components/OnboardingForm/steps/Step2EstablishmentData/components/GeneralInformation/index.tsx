"use client";

import { saveEstablishmentData } from "@/app/_actions/save-establishment-data";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORY_LABELS } from "@/maps/maps-labels";
import { generalInfoSchema } from "@/schemas/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RestaurantCategory } from "@prisma/client";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const RestaurantCategoryList = [
  "RESTAURANT",
  "PIZZARIA",
  "HAMBURGUERIA",
  "SORVETERIA",
  "ADEGA",
] as const;

type GeneralInformationProps = {
  defaultValues?: z.infer<typeof generalInfoSchema>;
  onUpdate: (data: z.infer<typeof generalInfoSchema>) => void;
  restaurantId: string;
};

const GeneralInformation = ({
  onUpdate,
  defaultValues,
  restaurantId,
}: GeneralInformationProps) => {
  const form = useForm<z.infer<typeof generalInfoSchema>>({
    resolver: zodResolver(generalInfoSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category: RestaurantCategory.RESTAURANT,
      slug: "",
      description: "",
    },
  });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const name = useWatch({
    control: form.control,
    name: "name",
  });

  useEffect(() => {
    if (!name) return;

    const generatedSlug = name
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    form.setValue("slug", generatedSlug, { shouldValidate: true });
  }, [name, form]);

  const onSubmit = async (data: z.infer<typeof generalInfoSchema>) => {
    if (!restaurantId) {
      toast.error("Restaurante não encontrado.");
      return;
    }

    const response = await saveEstablishmentData(restaurantId, "general", data);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    onUpdate(data);
    toast.success("Dados atualizados com sucesso!");
  };

  return (
    <>
      <h3 className="text-lg border-b-2 font-semibold mb-6 border-orange-500 w-fit">
        Informações Gerais
      </h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="grid gap-6 md:grid-cols-2">
          <Field>
            <FieldLabel>Nome do Estabelecimento</FieldLabel>
            <Input {...form.register("name")} />
            {form.formState.errors.name && (
              <span className="text-xs text-red-500">
                {form.formState.errors.name.message}
              </span>
            )}
          </Field>

          <Field>
            <FieldLabel>Categoria</FieldLabel>
            <Controller
              name="category"
              control={form.control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {RestaurantCategoryList.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {CATEGORY_LABELS[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel>Slug (Link da página)</FieldLabel>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                rangooo.com/
              </span>
              <Input {...form.register("slug")} />
            </div>
            <span className="text-xs text-red-500">
              {form.formState.errors.slug?.message}
            </span>
          </Field>
        </FieldGroup>

        <Field>
          <FieldLabel>Descrição / Sobre nós</FieldLabel>
          <Textarea
            {...form.register("description")}
            placeholder="Conte um pouco sobre a história do seu restaurante..."
            className="h-32"
          />
          {form.formState.errors.description && (
            <p className="text-xs text-red-500">
              {form.formState.errors.description.message}
            </p>
          )}
        </Field>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="cursor-pointer w-full"
            disabled={!form.formState.isValid}
          >
            Salvar
          </Button>
        </div>
      </form>
    </>
  );
};

export default GeneralInformation;
