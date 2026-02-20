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

type Step2EstablishmentDataProps = {
  restaurantId?: string | null;
  data: {
    name: string;
    email: string;
    restaurantName: string;
    phone: string;
    onboardingStep?: number;
  };
  onSuccess: () => void;
  onBack: () => void;
};

const Step2EstablishmentData = ({
  data,
  onSuccess,
  onBack,
}: Step2EstablishmentDataProps) => {
  const [formData, setFormData] = useState({
    general: {},
    address: {},
    contacts: [],
    gallery: [],
  });

  const handleUpdate = (key: string, data: any) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Step 2 - Informações do Estabelecimento
        </CardTitle>
        <CardDescription>
          Agora vamos configurar os dados do seu estabelecimento, como nome,
          endereço, identidade visual e link personalizado... Essas informações
          serão exibidas para seus clientes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <GeneralInformation
          onUpdate={(data) => handleUpdate("general", data)}
        />

        <EstablishmentAddress
          onUpdate={(data) => handleUpdate("general", data)}
        />

        <EstablishmentContacts />

        <GalleryEstablishment />
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
