import { saveEstablishmentData } from "@/app/_actions/save-establishment-data";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { establishmentAddressSchema } from "@/schemas/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type AddressFormValues = z.infer<typeof establishmentAddressSchema>;

type EstablishmentAddressProps = {
  onUpdate: (data: AddressFormValues) => void;
  restaurantId?: string;
  defaultValues?: AddressFormValues;
};

const EstablishmentAddress = ({
  onUpdate,
  restaurantId,
  defaultValues,
}: EstablishmentAddressProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(establishmentAddressSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("state", data.uf);
        document.getElementById("number")?.focus();
      }
    }
  };

  const onSubmit = async (data: AddressFormValues) => {
    if (!restaurantId) {
      toast.error("Restaurante não encontrado.");
      return;
    }

    const response = await saveEstablishmentData(restaurantId, "address", data);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    onUpdate(data);
    toast.success("Endereço atualizado com sucesso!");
  };

  return (
    <>
      <h3 className="text-lg border-b-2 font-semibold mb-6 border-orange-500 w-fit">
        Endereço
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field>
            <FieldLabel>CEP</FieldLabel>
            <Input
              {...register("zipCode")}
              placeholder="00000-000"
              onChange={(e) => {
                register("zipCode").onChange(e);
                handleZipCodeChange(e);
              }}
            />
            {errors.zipCode && (
              <p className="text-xs text-red-500">{errors.zipCode.message}</p>
            )}
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel>Rua/Logradouro</FieldLabel>
            <Input {...register("street")} />
            {errors.street && (
              <p className="text-xs text-red-500">{errors.street.message}</p>
            )}
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field>
            <FieldLabel>Número</FieldLabel>
            <Input id="number" {...register("number")} />
            {errors.number && (
              <p className="text-xs text-red-500">{errors.number.message}</p>
            )}
          </Field>
          <Field className="md:col-span-2">
            <FieldLabel>Complemento</FieldLabel>
            <Input
              {...register("complement")}
              placeholder="Apto, Bloco, etc."
            />
            {errors.complement && (
              <p className="text-xs text-red-500">
                {errors.complement.message}
              </p>
            )}
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field>
            <FieldLabel>Bairro</FieldLabel>
            <Input {...register("neighborhood")} />
            {errors.neighborhood && (
              <p className="text-xs text-red-500">
                {errors.neighborhood.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel>Cidade</FieldLabel>
            <Input {...register("city")} />
            {errors.city && (
              <p className="text-xs text-red-500">{errors.city.message}</p>
            )}
          </Field>
          <Field>
            <FieldLabel>Estado</FieldLabel>
            <Input {...register("state")} />
            {errors.state && (
              <p className="text-xs text-red-500">{errors.state.message}</p>
            )}
          </Field>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          Salvar Endereço
        </Button>
      </form>
    </>
  );
};

export default EstablishmentAddress;
