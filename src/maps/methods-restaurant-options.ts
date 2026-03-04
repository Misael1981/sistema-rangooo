import { PlanType } from "@prisma/client";

export const CONSUMPTION_METHODS = [
  { value: "DINE_IN", label: "Comer no local" },
  { value: "PICKUP", label: "Pegar no local" },
  { value: "DELIVERY", label: "Entrega" },
] as const;

export const PAYMENT_METHODS = [
  { value: "CREDIT_CARD", label: "Cartão de Crédito" },
  { value: "DEBIT_CARD", label: "Cartão de Débito" },
  { value: "PIX", label: "PIX" },
  { value: "CASH", label: "Dinheiro" },
] as const;

export type ConsumptionMethodValue =
  (typeof CONSUMPTION_METHODS)[number]["value"];
export type PaymentMethodValue = (typeof PAYMENT_METHODS)[number]["value"];

export type PlanDetail = {
  id: PlanType;
  title: string;
  description: string;
  features: string[]; // Dica: adicionei isso pra você listar os benefícios!
};

export const PLANS_DETAILS: PlanDetail[] = [
  {
    id: PlanType.BASICO,
    title: "Plano Básico",
    description:
      "Ideal para estabelecimentos que estão começando e desejam uma presença online simples. Inclui recursos essenciais para gerenciar seu cardápio, pedidos e clientes.",
    features: ["Cardápio Digital", "Gestão de Pedidos", "Entrega Própria"],
  },
  {
    id: PlanType.PRO,
    title: "Plano Pro",
    description:
      "Nesse plano o estabelecimento tem acesso às entregas do Rangooo Entregas. O pedido chega direto para nossos entregadores parceiros, que cuidam de tudo para você.",
    features: ["Tudo do Básico", "Logística Rangooo", "Maior Visibilidade"],
  },
];
