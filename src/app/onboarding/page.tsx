import db from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import OnboardingForm from "./components/OnboardingForm";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  const invite = await db.enrollmentInvite.findUnique({
    where: { token },
    include: {
      lead: true,
    },
  });

  if (!invite) notFound();

  if (invite.usedAt) {
    redirect("/login?message=Este convite já foi utilizado.");
  }

  const restaurant = invite.restaurantId
    ? await db.restaurant.findUnique({
        where: { id: invite.restaurantId },
      })
    : null;

  const isExpired = new Date() > invite.expiresAt;
  if (isExpired) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Convite Expirado! 😫
        </h1>
        <p className="text-gray-600">
          Este link de cadastro perdeu a validade (48h).
        </p>
        <p className="mt-4">Chame a gente no WhatsApp para gerar um novo!</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Seja bem-vindo ao Rangooo!
          </h1>
          <p className="text-gray-600">
            Falta pouco para o <strong>{invite.lead.restaurantName}</strong>{" "}
            começar a vender.
          </p>
        </div>

        <OnboardingForm
          token={token}
          initialData={{
            name: invite.lead.name,
            email: invite.lead.email,
            restaurantName: invite.lead.restaurantName,
            phone: invite.lead.phone,
            onboardingStep: restaurant?.onboardingStep ?? 1,
          }}
          initialRestaurantData={restaurant}
        />
      </div>
    </main>
  );
}
