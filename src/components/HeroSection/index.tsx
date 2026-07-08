import DemoVideo from "./components/DemoVideo";
import MainContent from "./components/MainContent";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-orange-500 via-red-500 to-purple-600 pb-20">
      <div className="absolute inset-0 bg-black/40" />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20">
        <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
          {/* Conteúdo Principal */}
          <MainContent />
          {/* Mockup/Ilustração */}
          <div className="relative mx-auto w-full max-w-xs">
            <DemoVideo />
            {/* Elementos flutuantes */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-yellow-400/20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-purple-400/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
