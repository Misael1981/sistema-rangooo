"use client";

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
import GeneralInformation from "./components/GeneralInformation";
import EstablishmentAddress from "./components/EstablishmentAddress";
import EstablishmentContacts from "./components/EstablishmentContacts";
import GalleryEstablishment from "./components/GalleryEstablishment";
import { useState } from "react";
import {
  establishmentAddressSchema,
  establishmentContactInfoSchema,
  gallerySchema,
  generalInfoSchema,
} from "@/schemas/onboarding-schema";
import z from "zod";
import { ContactNumber } from "@prisma/client";
import { RestaurantOnboardingDTO } from "@/dtos/restaurant-onboarding.dto";

type Step2Payload = {
  restaurantId: string;
  general: z.infer<typeof generalInfoSchema>;
  address: z.infer<typeof establishmentAddressSchema>;
  contacts: z.infer<typeof establishmentContactInfoSchema>;
  gallery: z.infer<typeof gallerySchema>;
};

type Step2EstablishmentDataProps = {
  restaurantId?: string | null;
  data: {
    name: string;
    email: string;
    restaurantName: string;
    phone: string;
    onboardingStep?: number;
  };
  contacts: ContactNumber[] | null;
  onSuccess: () => void;
  onBack: () => void;
  initialRestaurantData: RestaurantOnboardingDTO | null;
};

type SocialMedia = {
  name: string;
  url: string;
};

const parseSocialMedia = (value: unknown): SocialMedia[] => {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is SocialMedia =>
      typeof item === "object" &&
      item !== null &&
      "name" in item &&
      "url" in item &&
      typeof item.name === "string" &&
      typeof item.url === "string",
  );
};

const Step2EstablishmentData = ({
  onSuccess,
  onBack,
  initialRestaurantData,
  contacts,
}: Step2EstablishmentDataProps) => {
  const [formData, setFormData] = useState<Step2Payload>({
    restaurantId: initialRestaurantData?.id ?? "",
    general: {
      name: initialRestaurantData?.name ?? "",
      description: initialRestaurantData?.description ?? "",
      plan: initialRestaurantData?.plan as "BASICO" | "PRO",
      category: initialRestaurantData?.category as
        | "RESTAURANT"
        | "PIZZARIA"
        | "HAMBURGUERIA"
        | "SORVETERIA"
        | "ADEGA",
      slug: initialRestaurantData?.slug ?? "",
    },
    address: {
      street: initialRestaurantData?.street ?? "",
      number: initialRestaurantData?.number ?? "",
      neighborhood: initialRestaurantData?.neighborhood ?? "",
      city: initialRestaurantData?.city ?? "",
      state: initialRestaurantData?.state ?? "",
      zipCode: initialRestaurantData?.zipCode ?? "",
    },
    contacts: {
      contacts: contacts ?? [],
      email: initialRestaurantData?.email ?? "",
      socialMedia: parseSocialMedia(initialRestaurantData?.socialMedia),
    },
    gallery: {
      avatarImageUrl: initialRestaurantData?.avatarImageUrl ?? "",
      coverImageUrl: initialRestaurantData?.coverImageUrl ?? "",
    },
  });

  const handleUpdate = <K extends keyof Step2Payload>(
    key: K,
    data: Step2Payload[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  return (
    <Card className="border-none">
      <CardHeader className="p-0">
        <CardTitle className="text-xl">
          Step 2 - Informações do Estabelecimento
        </CardTitle>
        <CardDescription>
          Agora vamos configurar os dados do seu estabelecimento, como nome,
          endereço, identidade visual e link personalizado... Essas informações
          serão exibidas para seus clientes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-0 border-none">
        <GeneralInformation
          onUpdate={(data) => handleUpdate("general", data)}
          defaultValues={formData.general}
          restaurantId={initialRestaurantData?.id ?? ""}
        />

        <EstablishmentAddress
          onUpdate={(data) => handleUpdate("address", data)}
          restaurantId={initialRestaurantData?.id ?? ""}
          defaultValues={formData.address}
        />

        <EstablishmentContacts
          onUpdate={(data) => handleUpdate("contacts", data)}
          defaultValues={formData.contacts}
          restaurantId={initialRestaurantData?.id ?? ""}
        />

        <GalleryEstablishment
          onUpdate={(data) => handleUpdate("gallery", data)}
          defaultValues={formData.gallery}
          restaurantId={initialRestaurantData?.id ?? ""}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button onClick={onBack} variant="outline">
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

export default Step2EstablishmentData;
