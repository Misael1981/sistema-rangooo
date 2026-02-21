import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { establishmentContactInfoSchema } from "@/schemas/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";

type ContactsFormValues = z.infer<typeof establishmentContactInfoSchema>;

type EstablishmentContactsProps = {
  onUpdate: (data: ContactsFormValues) => void;
};

const EstablishmentContacts = ({ onUpdate }: EstablishmentContactsProps) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactsFormValues>({
    resolver: zodResolver(establishmentContactInfoSchema),
    defaultValues: {
      contacts: [{ type: "WHATSAPP", number: "", isPrimary: true }],
      socialMedia: [],
      email: "",
    },
  });

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control,
    name: "contacts",
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socialMedia",
  });

  const contacts = watch("contacts");

  const onSubmit = async (data: ContactsFormValues) => {
    console.log("onSubmit: ", data);
  };

  return (
    <>
      <h3 className="text-lg border-b-2 font-semibold mb-6 border-orange-500 w-fit">
        Redes Sociais & Canais de Atendimento
      </h3>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            appendContact({ type: "WHATSAPP", number: "", isPrimary: false })
          }
        >
          + Telefone
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {contactFields.map((field, index) => (
          <div
            key={field.id}
            className="group relative grid grid-cols-1 gap-4 rounded-lg border p-4 transition-colors hover:bg-slate-50 md:grid-cols-12 items-end"
          >
            <div className="md:col-span-3">
              <FieldLabel className="text-xs">Tipo</FieldLabel>
              <Controller
                control={control}
                name={`contacts.${index}.type`}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                      <SelectItem value="PHONE">Telefone</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Número (Mantemos o register, mas com ajuste no setValue) */}
            <div className="md:col-span-5">
              <FieldLabel className="text-xs">Número</FieldLabel>
              <Input
                placeholder="(00) 0 0000-0000"
                {...register(`contacts.${index}.number`)}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  // Usamos o setValue para garantir que o hook-form veja o valor formatado
                  setValue(`contacts.${index}.number`, formatted, {
                    shouldValidate: true,
                  });
                }}
              />
              {errors.contacts?.[index]?.number && (
                <p className="text-[10px] text-red-500">
                  {errors.contacts[index]?.number?.message}
                </p>
              )}
            </div>

            {/* Principal com Controller */}
            <div className="flex items-center gap-2 pb-3 md:col-span-3">
              <Controller
                control={control}
                name={`contacts.${index}.isPrimary`}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    id={`primary-${index}`}
                    checked={value}
                    onCheckedChange={(checked) => {
                      // Se você quiser que apenas UM seja principal:
                      if (checked) {
                        contacts.forEach((_, i) =>
                          setValue(`contacts.${i}.isPrimary`, false),
                        );
                      }
                      onChange(checked);
                    }}
                  />
                )}
              />
              <FieldLabel
                htmlFor={`primary-${index}`}
                className="mb-0 cursor-pointer text-xs"
              >
                Principal?
              </FieldLabel>
            </div>

            {/* Botão Remover */}
            <div className="md:col-span-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => removeContact(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {errors.contacts?.message && (
          <p className="text-sm text-red-500">{errors.contacts.message}</p>
        )}

        {/* SEÇÃO DE REDES SOCIAIS */}
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendSocial({ name: "INSTAGRAM", url: "" })}
          >
            + Rede Social
          </Button>
        </div>

        {socialFields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-4 rounded-md border p-4 sm:flex-row sm:items-end"
          >
            <div className="flex-1 space-y-2">
              <FieldLabel>Nome (Ex: Instagram)</FieldLabel>
              <Input
                {...register(`socialMedia.${index}.name`)}
                placeholder="Instagram"
              />
            </div>

            <div className="flex-2 space-y-2">
              <FieldLabel>URL do Perfil</FieldLabel>
              <Input
                {...register(`socialMedia.${index}.url`)}
                placeholder="https://instagram.com/seu-perfil"
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-red-500"
              onClick={() => removeSocial(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <div className="space-y-2 border-b pb-6">
          <FieldLabel>E-mail de Contato Público</FieldLabel>
          <Input {...register("email")} placeholder="contato@restaurante.com" />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full ">
          Salvar
        </Button>
      </form>
    </>
  );
};

export default EstablishmentContacts;
