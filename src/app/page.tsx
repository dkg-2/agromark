import { WovenLightHero } from "@/components/ui/woven-light-hero";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { FeatureSection } from "@/components/ui/feature-section";


export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4 z-50">
        <ToggleTheme />
      </div>
      <WovenLightHero />
      <FeatureSection />
    </main>
  );
}
