import FeatureCard from "@/components/FeatureCard";

const features = [
  {
    title: "Transparency",
    description:
      "All donations are recorded on the blockchain and can be viewed by anyone.",
    icon: "eye",
  },
  {
    title: "Trust",
    description:
      "Donors can trust that their donations are being used for the intended purpose.",
    icon: "shield-check",
  },
  {
    title: "Decentralization",
    description: "No central authority has control over the donations.",
    icon: "globe",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-800 text-gray-300 py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
