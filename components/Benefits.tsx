import React from 'react';
import { StarIcon } from './icons/StarIcon';
import { RulerIcon } from './icons/RulerIcon';
import { PaletteIcon } from './icons/PaletteIcon';
import { ZapIcon } from './icons/ZapIcon';

const benefits = [
  {
    icon: StarIcon,
    title: "Premium Quality",
    description: "We use top-tier materials and fade-resistant inks for a durable, high-impact finish that lasts."
  },
  {
    icon: RulerIcon,
    title: "Any Size, Any Shape",
    description: "From standard sizes to custom die-cut shapes, we bring your unique vision to life with precision."
  },
  {
    icon: PaletteIcon,
    title: "Vibrant Colors",
    description: "Our state-of-the-art printing process ensures your designs are reproduced with sharp details and rich, vivid colors."
  },
  {
    icon: ZapIcon,
    title: "Fast Production",
    description: "With a streamlined process, we ensure your custom magnets are printed and ready for dispatch quickly."
  }
];

const BenefitCard: React.FC<{ benefit: typeof benefits[0] }> = ({ benefit }) => (
  <div className="bg-gray-800 p-5 rounded-xl flex items-start gap-4 border border-gray-700/50">
    <div className="flex-shrink-0 bg-gray-900 p-2 rounded-lg">
        <benefit.icon className="w-6 h-6 text-indigo-400" />
    </div>
    <div>
      <h3 className="font-bold text-white text-md">{benefit.title}</h3>
      <p className="text-gray-400 text-sm leading-snug mt-1">{benefit.description}</p>
    </div>
  </div>
);

export const Benefits: React.FC = () => {
  return (
    <div>
        <h2 className="text-xl font-bold text-white mb-4">Benefits of our Magnet Sheet</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
        ))}
        </div>
    </div>
  );
};