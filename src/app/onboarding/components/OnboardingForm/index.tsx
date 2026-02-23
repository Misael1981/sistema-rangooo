"use client";

import { useState } from "react";
import { ownerSchema } from "@/schemas/onboarding-schema";
import { ContactNumber, Restaurant } from "@prisma/client";
import { MenuCategoryData } from "@/dtos/onboarding.dto";
import { RestaurantFullDTO } from "@/dtos/restaurant-full-data.dto";
import z from "zod";
import Step1OwnerData from "./steps/Step1OwnerData";
import Step2EstablishmentData from "./steps/Step2EstablishmentData";
import Step3ConsumptionMethodsAndSchedules from "./steps/Step3ConsumptionMethodsAndSchedules";
import Step4MenuEstablishmentData from "./steps/Step4MenuEstablishmentData";
import Step5Confirmation from "./steps/Step5Confirmation";

type OnboardingFormProps = {
  token: string;
  initialData: {
    name: string;
    email: string;
    restaurantName: string;
    phone: string;
    onboardingStep?: number;
  };
  restaurantId?: string;
  initialRestaurantData: Restaurant | null;
  menuCategories: MenuCategoryData[];
  contacts: ContactNumber[] | null;
  restaurantFullData: RestaurantFullDTO | null;
};

type OwnerValues = z.infer<typeof ownerSchema>;

export default function OnboardingForm({
  token,
  initialData,
  restaurantId,
  initialRestaurantData,
  menuCategories,
  contacts,
  restaurantFullData,
}: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(
    initialData.onboardingStep ?? 1,
  );
  const [activeRestaurantId, setActiveRestaurantId] = useState<string | null>(
    restaurantId || null,
  );
  const [formData, setFormData] = useState(initialData);

  const handleStep1Success = (id: string, updatedValues: OwnerValues) => {
    setActiveRestaurantId(id);
    setFormData((prev) => ({
      ...prev,
      ...updatedValues,
    }));

    nextStep();
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="space-y-8 bg-white p-8 rounded-xl shadow-sm border">
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`h-2 w-full mx-1 rounded-full ${s <= currentStep ? "bg-orange-500" : "bg-gray-200"}`}
          />
        ))}
      </div>

      {currentStep === 1 && (
        <Step1OwnerData
          token={token}
          data={formData}
          onSuccess={handleStep1Success}
          nextStep={nextStep}
        />
      )}

      {currentStep === 2 && (
        <Step2EstablishmentData
          restaurantId={initialRestaurantData?.id}
          data={initialData}
          onSuccess={nextStep}
          onBack={prevStep}
          initialRestaurantData={initialRestaurantData}
          contacts={contacts}
        />
      )}

      {currentStep === 3 && (
        <Step3ConsumptionMethodsAndSchedules
          onSuccess={nextStep}
          onBack={prevStep}
          restaurantId={initialRestaurantData?.id}
        />
      )}

      {currentStep === 4 && (
        <Step4MenuEstablishmentData
          restaurantId={initialRestaurantData?.id}
          data={formData}
          onSuccess={nextStep}
          onBack={prevStep}
          initialRestaurantData={initialRestaurantData}
          menuCategories={menuCategories}
          token={token}
        />
      )}

      {currentStep === 5 && (
        <Step5Confirmation
          restaurantId={activeRestaurantId}
          data={initialData}
          onSuccess={nextStep}
          onBack={prevStep}
          restaurantFullData={restaurantFullData}
        />
      )}
    </div>
  );
}
