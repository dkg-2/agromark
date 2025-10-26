import { LinkCard } from "@/components/ui/link-card";

const featureCardsData = [
  {
    title: "Plant Disease Detection",
    description:
      "Diagnose plant diseases through our AI model via image upload.",
    imageUrl:
      "https://placehold.co/400x300/1a202c/ffffff?text=Disease+Scan",
    href: "/plant-disease",
  },
  {
    title: "Crop Recommendation",
    description:
      "Get personalized crop suggestions based on soil and environmental data.",
    imageUrl:
      "https://placehold.co/400x300/1a202c/ffffff?text=Crop+Suggest",
    href: "/crop-recommendation",
  },
  {
    title: "AI Chat Assistant",
    description:
      "Your farming expert, ready to answer questions and provide insights.",
    imageUrl:
      "https://placehold.co/400x300/1a202c/ffffff?text=AI+Assistant",
    href: "/chat",
  },
];

export function FeatureSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Our Core Features
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Empowering farmers with cutting-edge AI and ML solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {featureCardsData.map((card) => (
          <LinkCard
            key={card.title}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            href={card.href}
          />
        ))}
      </div>
    </section>
  );
}
