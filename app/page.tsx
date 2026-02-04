import AboutUs from "@/components/AboutUs";
import HeroSection from "@/components/HeroSection";
import PlansSection from "@/components/PlansSection";

export default function Home() {
  return (
    <main className="min-h-screen space-y-12">
      <HeroSection />

      <AboutUs />

      <PlansSection />
    </main>
  );
}
