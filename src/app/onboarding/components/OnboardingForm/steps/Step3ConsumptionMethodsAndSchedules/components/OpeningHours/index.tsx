"use client";

import { useFormContext } from "react-hook-form";
import DayCard from "../DayCard";
import { BusinessHoursFormData } from "@/schemas/business-hours-schema";
import SubHeaderSteps from "@/components/SubHeaderSteps";

const OpeningHours = () => {
  const form = useFormContext<BusinessHoursFormData>();

  return (
    <div className="space-y-6 py-6">
      <SubHeaderSteps tittle="Horários de Funcionamento" />
      {Array.from({ length: 7 }).map((_, dayIndex) => (
        <DayCard key={dayIndex} dayIndex={dayIndex} control={form.control} />
      ))}
    </div>
  );
};

export default OpeningHours;
