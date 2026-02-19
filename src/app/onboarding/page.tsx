import db from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import OnboardingForm from "./components/OnboardingForm";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  // 1. Se não tem token, nem conversa.
  if (!token) {
    notFound();
  }

  // 2. Busca o convite no banco
  const invite = await db.enrollmentInvite.findUnique({
    where: { token },
    include: {
      lead: true, // Trazemos os dados que ele já preenchiu no cadastro inicial
    },
  });

  // 3. Validações de segurança
  if (!invite) notFound();

  if (invite.usedAt) {
    // Se já usou, manda pra página de login ou algo assim
    redirect("/login?message=Este convite já foi utilizado.");
  }

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

  // 4. Se passou em tudo, renderiza o formulário de verdade!
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

        {/* Passamos o token e os dados do lead para pré-preencher o form */}
        <OnboardingForm
          token={token}
          initialData={{
            name: invite.lead.name,
            email: invite.lead.email,
            restaurantName: invite.lead.restaurantName,
            phone: invite.lead.phone,
          }}
        />
      </div>
    </main>
  );
}
