import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

const featuresBasic = [
  "Site de delivery completo",
  "Cardápio personalizado",
  "Login simples com redes sociais",
  "Sistema de Pedidos Online",
  "Notificações em Tempo Real",
  "Impressão automática na cozinha",
  "Relatórios Detalhados",
  "Integração com Pagamentos",
  "Painel de Gestão Inteligente",
  "Atendimento ao Cliente 24/7",
];

const featuresPro = [
  "Todas as funcionalidades do Plano Básico",
  "App exclusivo para entregadores",
  "Pedido enviado automaticamente ao entregador",
  "Controle de status da entrega em tempo real",
  "Organização da logística do delivery",
  "SDK para controle de produção",
];

const PlansSection = () => {
  return (
    <section className="bg-gray-50 py-20" id="plans">
      <div className="mx-auto max-w-7xl p-4 text-center">
        <h2 className="mb-4 text-4xl font-bold text-orange-500 lg:text-5xl">
          Aproveite 7 dias grátis...
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Teste o Rangooo gratuitamente por 7 dias, e veja como ele pode
          simplificar o seu gerenciamento de estabelecimentos.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <Card className="group relative w-90 p-6 max-w-[95%] overflow-hidden border-2 border-orange-200 transition-all duration-500 hover:scale-105 hover:border-orange-300 hover:shadow-2xl">
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 translate-x-full bg-linear-to-br from-orange-500/0 via-orange-500/5 to-orange-500/0 transition-transform duration-1000 group-hover:translate-x-full" />

          {/* Badge de Destaque */}
          <CardHeader>
            <div className=" inline-flex items-center gap-2 w-fit rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold uppercase text-white shadow-lg">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
              plano Básico
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            {/* Título */}
            <h4 className="mb-2 text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">
              Tenha sua própria plataforma de delivery
            </h4>

            {/* Descrição */}
            <p className="mb-6 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
              Com menos de R$ 100,00 mensais, aumente seu faturamento ao
              digitalizar todo o atendimento
            </p>

            {/* Preço */}
            <div className="mb-6 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 p-4 text-center text-white shadow-lg">
              <span className="text-3xl font-bold">R$ 98,00</span>
              <span className="block text-sm text-orange-100">/mês</span>
            </div>

            {/* Título da Lista */}
            <h5 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>O que
              está incluso no plano?
            </h5>

            {/* Lista de Features */}
            <ul className="mb-6 space-y-2">
              {featuresBasic.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 transition-all duration-300 hover:translate-x-2 hover:text-orange-600"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          {/* Botão CTA */}
          <CardFooter>
            <Button
              className="w-full rounded-xl bg-orange-500 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-xl active:scale-95 group-hover:bg-linear-to-r group-hover:from-orange-500 group-hover:to-red-500"
              asChild
            >
              <Link href="/cadastro">Começar Agora</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="group relative w-90 p-6 max-w-[95%] overflow-hidden border-2 border-red-300 transition-all duration-500 hover:scale-105 hover:border-red-400 hover:shadow-2xl">
          {/* Badge */}
          <CardHeader>
            <div className="inline-flex items-center w-fit px-4 py-2 gap-2 rounded-full bg-red-500 text-sm font-semibold uppercase text-white shadow-lg">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
              Plano Pró
            </div>
          </CardHeader>
          <CardContent className="relative z-10 flex-1">
            {/* Título */}
            <h4 className="mb-2 text-lg font-bold text-gray-800 group-hover:text-red-600">
              Gestão completa + Sistema de Entrega
            </h4>

            {/* Descrição */}
            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              Inclui todas as funcionalidades do Plano Básico e adiciona o
              Sistema de Entrega Inteligente do Rangooo.
            </p>

            {/* Preço */}
            <div className="mb-6 rounded-2xl bg-linear-to-r from-red-500 to-orange-500 p-4 text-center text-white shadow-lg">
              <span className="text-3xl font-bold">R$ 156,00</span>
              <span className="block text-sm text-red-100">/mês</span>
            </div>

            {/* Diferencial */}
            <h5 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              Sistema de Entrega inclui:
            </h5>

            {/* Lista de Features */}
            <ul className="mb-6 space-y-2">
              {featuresPro.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 transition-all duration-300 hover:translate-x-2 hover:text-orange-600"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-center text-orange-500">
              <span className="text-sm text-center">
                Um único turno do entregador já paga o sistema por um mês
                inteiro.
              </span>
            </div>
          </CardContent>
          <CardFooter className="">
            <Button
              className="w-full rounded-xl bg-red-500 text-lg font-bold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-xl active:scale-95"
              asChild
            >
              <Link href="/cadastro">Quero o Plano Pró</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default PlansSection;
