import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { gallerySchema } from "@/schemas/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type GalleryValue = z.infer<typeof gallerySchema>;

type GalleryEstablishmentProps = {
  onUpdate: (data: GalleryValue) => void;
};

const GalleryEstablishment = ({ onUpdate }: GalleryEstablishmentProps) => {
  const form = useForm<GalleryValue>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      avatarImageUrl: "",
      coverImageUrl: "",
    },
  });

  const onSubmit = async (data: GalleryValue) => {
    console.log(data);
  };

  return (
    <>
      <h3 className="text-lg border-b-2 font-semibold mb-6 border-orange-500 w-fit">
        Identidade Visual
      </h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload da Logo */}
          <div className="space-y-2">
            <FieldLabel>Logo do Estabelecimento</FieldLabel>
            <ImageUpload
              form={form}
              name="avatarImageUrl"
              initialUrl={form.getValues("avatarImageUrl")}
            />
          </div>

          {/* Upload da Capa */}
          <div className="space-y-2">
            <FieldLabel>Imagem de Capa</FieldLabel>
            <ImageUpload
              form={form}
              name="coverImageUrl"
              initialUrl={form.getValues("coverImageUrl")}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Salvar Identidade Visual
        </Button>
      </form>
    </>
  );
};

export default GalleryEstablishment;
