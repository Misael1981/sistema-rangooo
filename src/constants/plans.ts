export const PLAN = {
  BASICO: "BASICO",
  PRO: "PRO",
} as const;

export type PlanType = (typeof PLAN)[keyof typeof PLAN];
