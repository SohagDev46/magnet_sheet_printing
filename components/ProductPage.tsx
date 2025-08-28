import React, { useState } from 'react';
import { ProductOptions, PriceDetails, CartItem } from '../types';
import { DEFAULT_OPTIONS } from '../constants';
import { usePriceCalculation } from '../hooks/usePriceCalculation';
import { ImageShowcase } from './ImageShowcase';
import { PrintingOptions } from './PrintingOptions';
import { PriceCalculator } from './PriceCalculator';
import { UploadModal } from './UploadModal';
import { Tabs } from './Tabs';
import { Benefits } from './Benefits';
import { WhatsAppCta } from './WhatsAppCta';

interface ProductPageProps {
  onAddToCart: (item: CartItem) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const [options, setOptions] = useState<ProductOptions>(DEFAULT_OPTIONS);
  const priceDetails: PriceDetails = usePriceCalculation(options);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleOptionChange = <K extends keyof ProductOptions>(key: K, value: ProductOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleAddToCartWithArtwork = (file: File, previewUrl: string) => {
    const cartItem: CartItem = {
      options,
      priceDetails,
      artwork: { file, previewUrl }
    };
    onAddToCart(cartItem);
    setIsUploadModalOpen(false);
  };

  const handleUploadLater = () => {
    const cartItem: CartItem = { options, priceDetails };
    onAddToCart(cartItem);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8 text-center xl:text-left">
            Premium Magnet Sheet Printing in Malaysia
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
          
          {/* Left Column: Image Showcase & Benefits (Desktop) */}
          <div className="lg:col-span-12 xl:col-span-5 order-1">
            <div className="flex flex-col gap-8">
              <ImageShowcase />
              <div className="hidden xl:block">
                  <Benefits />
              </div>
            </div>
          </div>

          {/* Middle Column: Options */}
          <div className="lg:col-span-7 xl:col-span-4 order-3 xl:order-2">
            <PrintingOptions options={options} onOptionChange={handleOptionChange} />
          </div>
          
          {/* Right Column: Price Calculator (Desktop) */}
          <div className="hidden xl:block xl:col-span-3 order-2 xl:order-3">
            <div className="xl:sticky xl:top-8 self-start">
              <PriceCalculator 
                priceDetails={priceDetails}
                onGetStarted={() => setIsUploadModalOpen(true)}
                onUploadLater={handleUploadLater}
              />
            </div>
          </div>

          {/* Price Calculator for Mobile and Tablet */}
           <div className="block xl:hidden order-4">
               <PriceCalculator 
                priceDetails={priceDetails}
                onGetStarted={() => setIsUploadModalOpen(true)}
                onUploadLater={handleUploadLater}
              />
          </div>

        </div>

        {/* Full-width content below the main grid */}
        <div className="mt-16 md:mt-24">
          <Tabs />
        </div>

        {/* Benefits for mobile */}
        <div className="mt-16 md:mt-24 xl:hidden">
            <Benefits />
        </div>
        
        <div className="mt-16 md:mt-24">
          <WhatsAppCta />
        </div>
      </main>

      {isUploadModalOpen && (
        <UploadModal 
          onClose={() => setIsUploadModalOpen(false)}
          onAddToCart={handleAddToCartWithArtwork}
        />
      )}
    </div>
  );
};