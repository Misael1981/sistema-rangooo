"use client";

import { formSchema } from "@/schemas/lead-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

const CustomerRegistration = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      restaurantName: "",
      city: "",
      state: "",
      notes: "",
    },
  });
  return (
    <section>
      <Card className="mx-auto w-full max-w-3xl border border-orange-500 p-6">
        <CardTitle className="text-2xl font-bold">
          Cadastro do Estabelecimento
        </CardTitle>
        <CardDescription>
          Preencha os dados abaixo para começar seus 7 dias grátis no Rangooo
        </CardDescription>
        <CardContent></CardContent>
      </Card>
    </section>
  );
};

export default CustomerRegistration;
