import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Card>
        <h1 className="text-2xl font-bold font-heading">
          Bem-vindo ao Rangooo
        </h1>
      </Card>
      <Button>Acessar o Sistema</Button>
    </div>
  );
}
