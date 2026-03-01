import { saveEstablishmentData } from "@/app/_actions/save-establishment-data";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { gallerySchema } from "@/schemas/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type GalleryValue = z.infer<typeof gallerySchema>;

type GalleryEstablishmentProps = {
  onUpdate: (data: GalleryValue) => void;
  defaultValues: GalleryValue;
  restaurantId: string;
};

const GalleryEstablishment = ({
  onUpdate,
  defaultValues,
  restaurantId,
}: GalleryEstablishmentProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<GalleryValue>({
    resolver: zodResolver(gallerySchema),
    defaultValues,
  });

  const avatarValue = form.watch("avatarImageUrl");
  const coverValue = form.watch("coverImageUrl");

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const uploadToCloudinaryClient = async (file: File) => {
    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("file", compressedFile);
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
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } catch (error) {
      console.error("Erro na compressão ou upload:", error);
      throw error;
    }
  };

  const onSubmit = async (data: GalleryValue) => {
    setIsLoading(true);

    let avatarUrl = data.avatarImageUrl as string;
    let coverUrl = data.coverImageUrl as string;

    if (data.avatarImageUrl instanceof File) {
      try {
        const uploadResult = await uploadToCloudinaryClient(
          data.avatarImageUrl,
        );
        avatarUrl = uploadResult.url;
      } catch (err) {
        toast.error("Falha ao subir a imagem para a nuvem.");
        console.error("Erro ao subir a imagem:", err);
        return;
      }
    }

    if (data.coverImageUrl instanceof File) {
      try {
        const uploadResult = await uploadToCloudinaryClient(data.coverImageUrl);
        coverUrl = uploadResult.url;
      } catch (err) {
        toast.error("Falha ao subir a imagem para a nuvem.");
        console.error("Erro ao subir a imagem:", err);
        return;
      }
    }

    await saveEstablishmentData(restaurantId, "gallery", {
      avatarImageUrl: avatarUrl,
      coverImageUrl: coverUrl,
    });

    onUpdate({
      avatarImageUrl: avatarUrl,
      coverImageUrl: coverUrl,
    });

    setIsLoading(false);
    toast.success("Tudo salvo, patrão!");
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
              initialUrl={avatarValue}
            />
          </div>

          {/* Upload da Capa */}
          <div className="space-y-2">
            <FieldLabel>Imagem de Capa</FieldLabel>
            <ImageUpload
              form={form}
              name="coverImageUrl"
              initialUrl={coverValue}
            />
          </div>
        </div>

        <Button className="w-full">
          {isLoading ? "Salvando..." : "Salvar Identidade Visual"}
        </Button>
      </form>
    </>
  );
};

export default GalleryEstablishment;
