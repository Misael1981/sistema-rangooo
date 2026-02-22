import { upsertProduct } from "@/app/_actions/upsert-product";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MenuProductWithCategoryDTO } from "@/dtos/onboarding.dto";
import {
  formatCurrencyBRL,
  parseCurrencyBRL,
} from "@/helpers/format-currency-brl";
import { productSchema } from "@/schemas/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type DialogAddProductProps = {
  product: MenuProductWithCategoryDTO | null;
  dialogAddProductOpen: boolean;
  setDialogAddProductOpen: (open: boolean) => void;
  selectedCategoryName: string;
  selectedCategoryId: string;
  token: string;
  restaurantId: string;
};

const DialogAddProduct = ({
  dialogAddProductOpen,
  setDialogAddProductOpen,
  product,
  token,
  selectedCategoryName,
  selectedCategoryId,
  restaurantId,
}: DialogAddProductProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });

  const { register, handleSubmit, control, reset } = form;

  useEffect(() => {
    if (!dialogAddProductOpen) return;

    if (product) {
      reset({
        name: product.name,
        price: formatCurrencyBRL(String(product.price * 100)),
        ingredients: product.ingredients.join(", "),
        description: product.description ?? "",
        imageUrl: product.imageUrl ?? null,
      });
    } else {
      reset({
        name: "",
        price: "",
        ingredients: "",
        description: "",
        imageUrl: null,
      });
    }
  }, [product, dialogAddProductOpen, reset]);

  const uploadToCloudinaryClient = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    return { url: data.secure_url, publicId: data.public_id };
  };

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    let imageUrl = data.imageUrl;
    setIsSubmitting(true);

    if (data.imageUrl instanceof File) {
      try {
        const uploadResult = await uploadToCloudinaryClient(data.imageUrl);
        imageUrl = uploadResult.url;
      } catch (err) {
        toast.error("Falha ao subir a imagem para a nuvem.");
        console.error("Erro ao subir a imagem:", err);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const payload = {
        id: product?.id,
        name: data.name,
        price: parseCurrencyBRL(data.price),
        description: data.description,
        imageUrl,
        ingredients: data.ingredients
          ? data.ingredients
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean)
          : [],
        menuCategoryId: selectedCategoryId,
      };

      const result = await upsertProduct(payload, token, restaurantId);
      console.log("PAYLOAD ID:", payload.id);

      if (result.success) {
        toast.success(product ? "Produto atualizado!" : "Produto criado!");
        setDialogAddProductOpen(false);
        form.reset();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("ops, algo deu errado.!");
      console.error("Erro ao submeter o formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={dialogAddProductOpen} onOpenChange={setDialogAddProductOpen}>
      <DialogContent className="sm:max-w-2xl w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              Produto da
              <span className="text-primary">
                {" "}
                Tabela {selectedCategoryName}
              </span>
            </DialogTitle>
            <DialogDescription>
              Adicione ou edite produtos da tabela
            </DialogDescription>
          </DialogHeader>
          <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4 pb-16">
            <FieldGroup>
              <Field>
                <FieldLabel>Imagem do Produto</FieldLabel>
                <ImageUpload
                  form={form}
                  name="imageUrl"
                  initialUrl={product?.imageUrl}
                />
              </Field>
              <div className="flex gap-2 items-center">
                <Field className="w-2/3">
                  <Label htmlFor="name-1">Nome</Label>
                  <Input
                    id="name-1"
                    type="text"
                    {...register("name")}
                    defaultValue={product?.name}
                  />
                </Field>
                <div className="w-1/3">
                  <Label htmlFor="price-1" className="mb-3">
                    Preço
                  </Label>
                  <Controller
                    control={control}
                    name="price"
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        ref={ref}
                        id="price"
                        type="text"
                        inputMode="numeric"
                        value={value}
                        onChange={(e) => {
                          const formattedValue = formatCurrencyBRL(
                            e.target.value,
                          );
                          onChange(formattedValue);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <Field>
                <Label htmlFor="ingredients-1">Ingredientes</Label>
                <Input
                  id="ingredients-1"
                  {...register("ingredients")}
                  defaultValue={product?.ingredients}
                />
              </Field>
              <Field>
                <Label htmlFor="description-1">Descrição</Label>
                <Textarea
                  id="description-1"
                  {...register("description")}
                  defaultValue={product?.description || ""}
                />
              </Field>
            </FieldGroup>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
