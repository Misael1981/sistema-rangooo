import { ConfettiLauncher } from "@/components/ConfettiLauncher";
import { FaWhatsapp } from "react-icons/fa";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; restaurant?: string }>;
}) {
  const { name, restaurant } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-orange-50 px-4 text-center">
      <ConfettiLauncher />
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Quase lá, {name?.split(" ")[0]}!
        </h1>
        <p className="text-lg text-gray-600">
          O <strong>{restaurant}</strong> já está na nossa fila de ativação.
          Nossa equipe analisa cada estabelecimento para garantir a qualidade do
          Rangooo.
        </p>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-orange-100">
          <h2 className="font-semibold mb-4">Próximos passos:</h2>
          <ul className="text-left space-y-3 text-sm">
            <li className="flex gap-2">✅ Recebemos seu cadastro</li>
            <li className="flex gap-2 text-orange-600 font-bold">
              ⏳ Analisando dados (Geralmente leva menos de 24 horas)
            </li>
            <li className="flex gap-2 text-gray-400">
              🔒 Liberação do seu painel Admin
            </li>
          </ul>
        </div>

        <a
          href={`https://wa.me/5535999110933?text=Oi, sou o ${name} do ${restaurant} e acabei de me cadastrar!`}
          className="flex items-center justify-center w-full rounded-lg bg-green-500 px-6 py-4 font-bold text-white hover:bg-green-600 transition-colors"
        >
          <FaWhatsapp className="mr-2 font-bold text-xl" />
          <span>Acelerar aprovação via WhatsApp</span>
        </a>
      </div>
    </main>
  );
}
