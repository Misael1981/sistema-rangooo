"use client";

import { useState } from "react";
import Step1OwnerData from "./steps/Step1OwnerData";
import Step2EstablishmentData from "./steps/Step2EstablishmentData";
import Step3MenuEstablishmentData from "./steps/Step3MenuEstablishmentData";
import Step4Confirmation from "./steps/Step4Confirmation";
import { ownerSchema } from "@/schemas/onboarding-schema";
import z from "zod";

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
};

type OwnerValues = z.infer<typeof ownerSchema>;

export default function OnboardingForm({
  token,
  initialData,
  restaurantId,
}: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(
    initialData.onboardingStep || 1,
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
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-2 w-full mx-1 rounded-full ${s <= currentStep ? "bg-orange-500" : "bg-gray-200"}`}
          />
        ))}
      </div>

      {currentStep === 1 && (
        <Step1OwnerData
          restaurantId={activeRestaurantId}
          token={token}
          data={formData}
          onSuccess={handleStep1Success}
          nextStep={nextStep}
        />
      )}

      {currentStep === 2 && (
        <Step2EstablishmentData
          restaurantId={restaurantId}
          data={initialData}
          onSuccess={nextStep}
          onBack={prevStep}
        />
      )}

      {currentStep === 3 && (
        <Step3MenuEstablishmentData
          restaurantId={restaurantId}
          data={initialData}
          onSuccess={nextStep}
          onBack={prevStep}
        />
      )}

      {currentStep === 4 && (
        <Step4Confirmation
          restaurantId={restaurantId}
          data={initialData}
          onSuccess={nextStep}
          onBack={prevStep}
        />
      )}
    </div>
  );
}
