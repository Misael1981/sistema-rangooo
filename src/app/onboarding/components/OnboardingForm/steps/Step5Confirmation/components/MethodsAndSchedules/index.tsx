import { Badge } from "@/components/ui/badge";
import {
  BusinessHoursDTO,
  ConsumptionMethodsDTO,
  PaymentMethodsDTO,
} from "@/dtos/restaurant-full-data.dto";
import {
  CONSUMPTION_METHODS,
  PAYMENT_METHODS,
} from "@/maps/methods-restaurant-options";

type MethodsAndSchedulesProps = {
  consumptionMethods: ConsumptionMethodsDTO[];
  paymentMethods: PaymentMethodsDTO[];
  businessHours: BusinessHoursDTO[] | null;
};

const MethodsAndSchedules = ({
  consumptionMethods,
  paymentMethods,
  businessHours,
}: MethodsAndSchedulesProps) => {
  const getConsumptionLabel = (value: string) =>
    CONSUMPTION_METHODS.find((m) => m.value === value)?.label ?? value;

  const getPaymentLabel = (value: string) =>
    PAYMENT_METHODS.find((m) => m.value === value)?.label ?? value;

  const dayNames = [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb",
  ];

  const sortedHours = (businessHours ?? []).slice().sort((a, b) => a.dayOfWeek - b.dayOfWeek);

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Métodos de Consumo</h4>
        <div className="flex flex-wrap gap-2">
          {consumptionMethods
            .filter((m) => m.isActive)
            .map((m) => (
              <Badge key={m.id}>{getConsumptionLabel(m.method)}</Badge>
            ))}
          {consumptionMethods.every((m) => !m.isActive) && (
            <span className="text-sm text-muted-foreground">Nenhum</span>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Métodos de Pagamento</h4>
        <div className="flex flex-wrap gap-2">
          {paymentMethods
            .filter((m) => m.isActive)
            .map((m) => (
              <Badge key={m.id}>{getPaymentLabel(m.method)}</Badge>
            ))}
          {paymentMethods.every((m) => !m.isActive) && (
            <span className="text-sm text-muted-foreground">Nenhum</span>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Horários</h4>
        <div className="flex flex-col gap-2">
          {sortedHours.length === 0 && (
            <span className="text-sm text-muted-foreground">Sem horários definidos</span>
          )}

          {sortedHours.map((bh) => (
            <div key={bh.id} className="flex items-center justify-between">
              <span className="text-sm">{dayNames[bh.dayOfWeek] ?? bh.dayOfWeek}</span>
              <div className="text-sm text-right">
                {bh.isClosed ? (
                  <span className="text-muted-foreground">Fechado</span>
                ) : bh.timeSlots && bh.timeSlots.length > 0 ? (
                  bh.timeSlots
                    .map((t) => `${t.open} - ${t.close}`)
                    .join(", ")
                ) : (
                  <span className="text-muted-foreground">Sem horários</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodsAndSchedules;
