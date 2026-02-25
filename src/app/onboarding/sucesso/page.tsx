import ButtonSuccessOnboarding from "@/components/ButtonSuccessOnboarding";
import { ConfettiLauncher } from "@/components/ConfettiLauncher";
import { db } from "@/lib/prisma";

export default async function SuccessOnboardingPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = await searchParams;

  if (!id) return <div>Erro: Identificador não encontrado.</div>;
  const restaurant = await db.restaurant.findUnique({
    where: { id },
    select: { name: true, slug: true },
  });

  if (!restaurant) return <div>Restaurante não encontrado.</div>;

  const { name, slug } = restaurant;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-orange-50 px-4 text-center">
      <ConfettiLauncher />

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Sucesso!!!!!</h1>
      <p className="text-gray-600 mb-8 max-w-sm">
        Seu restaurante <strong>{name}</strong> está configurado e pronto para
        brilhar no Rangooo!
      </p>

      <ButtonSuccessOnboarding slug={slug} />
    </div>
  );
}
