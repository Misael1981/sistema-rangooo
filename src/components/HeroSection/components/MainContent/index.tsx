import Link from "next/link";

const MainContent = () => {
  return (
    <div className="text-white">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
        <span className="text-sm">Plataforma de Delivery Completa</span>
      </div>
      <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-6xl">
        Aumente suas{" "}
        <span className="bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
          vendas
        </span>{" "}
        com nossa tecnologia
      </h1>
      <p className="mb-8 text-xl leading-relaxed text-white/90">
        O <strong>Rangooo</strong> oferece uma experiência única para cada tipo
        de estabelecimento. Hamburguerias, pizzarias e restaurantes com
        funcionalidades específicas para aumentar a conversão.
      </p>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/cadastro"
          className="transform rounded-xl bg-white px-8 py-4 text-center text-lg font-bold text-orange-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-100"
        >
          Começar Agora - Grátis
        </Link>
        <Link
          href="#plans"
          className="rounded-xl border-2 border-white px-8 py-4 text-center text-lg font-bold text-white transition-all duration-300 hover:bg-white/10"
        >
          Ver Planos
        </Link>
      </div>
      <div className="flex items-center gap-6 text-white/80">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400"></div>
          <span>Configuração em 5 minutos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400"></div>
          <span>Suporte especializado</span>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
