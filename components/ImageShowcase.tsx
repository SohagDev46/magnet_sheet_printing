import React, { useState } from 'react';
import { Lightbox } from './Lightbox';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { PRODUCT_IMAGES } from '../constants';

export const ImageShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  };
  
  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        <img
          src={PRODUCT_IMAGES[activeIndex]}
          alt={`Magnet sheet preview ${activeIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
          onClick={() => openLightbox(activeIndex)}
        />
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition-all duration-200"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition-all duration-200"
          aria-label="Next image"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {PRODUCT_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`aspect-square w-full rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
              activeIndex === index ? 'border-indigo-500 scale-105' : 'border-transparent hover:border-gray-500'
            }`}
            onClick={() => openLightbox(index)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <Lightbox 
            images={PRODUCT_IMAGES} 
            startIndex={activeIndex} 
            onClose={() => setIsLightboxOpen(false)} 
        />
      )}
    </div>
  );
};
