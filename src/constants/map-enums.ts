import { AreaTypeDTO } from "@/dtos/restaurant-onboarding.dto";

export const buildInitialFees = (
  deliveryAreas: { areaType: AreaTypeDTO; fee: number }[],
) =>
  (["URBAN", "RURAL", "DISTRICT"] as const).map((type) => ({
    areaType: type,
    fee: deliveryAreas.find((area) => area.areaType === type)?.fee ?? 0,
  }));

export const buildSystemFees = (
  systemSettings: {
    URBAN: number;
    RURAL: number;
    DISTRICT: number;
  } | null,
) =>
  systemSettings
    ? [
        { areaType: "URBAN" as const, fee: systemSettings.URBAN },
        { areaType: "RURAL" as const, fee: systemSettings.RURAL },
        { areaType: "DISTRICT" as const, fee: systemSettings.DISTRICT },
      ]
    : [];
