import Image from "next/image";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="bg-black p-8 rounded-lg text-center border border-gray-700">
      <div className="flex justify-center items-center text-6xl text-gray-300 mb-10">
        <Image src={`/icons/${icon}.png`} alt={title} width={64} height={64} />
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
