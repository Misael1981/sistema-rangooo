import AboutUs from "@/components/AboutUs";
import FeaturesSection from "@/components/FeaturesSection";
import FinalCount from "@/components/FinalCount";
import HeroSection from "@/components/HeroSection";
import PlansSection from "@/components/PlansSection";

export default function Home() {
  return (
    <main className="min-h-screen space-y-12">
      <HeroSection />

      <AboutUs />

      <PlansSection />

      <FeaturesSection />

      <FinalCount />
    </main>
  );
}
