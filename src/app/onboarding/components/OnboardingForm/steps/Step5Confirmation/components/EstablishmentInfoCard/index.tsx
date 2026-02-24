import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ContactDTO } from "@/dtos/restaurant-full-data.dto";

type EstablishmentInfoCardProps = {
  establishmentInfoCard: {
    name: string | null;
    email: string | null;
    slug: string | null;
    description?: string | null;
    category?: string | null;
    deliveryFee?: number | null;
    street?: string | null;
    number?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    state?: string | null;
    contacts?: ContactDTO[];
  };
};

export default function EstablishmentInfoCard({
  establishmentInfoCard,
}: EstablishmentInfoCardProps) {
  const {
    name,
    email,
    slug,
    description,
    category,
    deliveryFee,
    street,
    number,
    neighborhood,
    city,
    state,
    contacts,
  } = establishmentInfoCard;

  const deliveryFeeText = deliveryFee?.toFixed(2) || "Não informado";

  return (
    <Card className="w-full shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          {category && <Badge variant="secondary">{category}</Badge>}
        </CardTitle>
        <p className="text-sm text-muted-foreground">@{slug}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{email}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Taxa de Entrega</p>
            <p className="font-medium">
              {deliveryFee !== undefined
                ? `R$ ${deliveryFeeText}`
                : "Não informado"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="text-sm">
          <p className="text-muted-foreground mb-1">Endereço</p>
          <p className="font-medium">
            {street && number
              ? `${street}, ${number}`
              : "Endereço não informado"}
          </p>
          {(neighborhood || city || state) && (
            <p className="text-muted-foreground">
              {[neighborhood, city, state].filter(Boolean).join(" • ")}
            </p>
          )}
        </div>

        <Separator />

        <div className="text-sm">
          <p className="text-muted-foreground mb-1">Canais de Atendimento</p>
          {contacts?.map((contact) => (
            <div key={contact.id} className="text-sm">
              <p className="font-medium">{contact.number}</p>
              <p className="text-muted-foreground text-xs">
                {contact.type}
                {contact.isPrimary && " • Principal"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
