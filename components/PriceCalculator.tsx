import React, { useState } from 'react';
import { PriceDetails } from '../types';
import { ChevronUpIcon } from './icons/ChevronUpIcon';

interface PriceCalculatorProps {
  priceDetails: PriceDetails;
  onGetStarted: () => void;
  onUploadLater: () => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ priceDetails, onGetStarted, onUploadLater }) => {
  const { basePrice, optionCosts, totalPrice } = priceDetails;
  const [isMobileSheetExpanded, setIsMobileSheetExpanded] = useState(false);

  const breakdownContent = (
     <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-baseline">
            <span className="text-gray-300 text-lg">Estimated Price</span>
            <span className="text-3xl font-bold text-white">
                RM {totalPrice.toFixed(2)}
            </span>
            </div>
            <div className="text-sm text-gray-400">Base Price: RM {basePrice.toFixed(2)} / A3 sheet</div>
        </div>
        <div className="border-t border-gray-700"></div>
        <div className="flex flex-col gap-2 text-sm">
            <h3 className="font-semibold text-white mb-1">Price Breakdown</h3>
            {optionCosts.length > 0 ? (
            optionCosts.map((item, index) => (
                <div key={index} className="flex justify-between text-gray-300">
                <span>{item.label}</span>
                <span>+ RM {item.cost.toFixed(2)}</span>
                </div>
            ))
            ) : (
            <p className="text-gray-400 italic">No additional options selected.</p>
            )}
        </div>
     </div>
  );

  const ctaButtons = (
     <div className="mt-6 flex flex-col gap-3">
        <button onClick={onGetStarted} className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">
          Get Started - Upload Artwork
        </button>
        <button onClick={onUploadLater} className="w-full bg-gray-700 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500">
          Upload Artwork Later
        </button>
      </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
        {breakdownContent}
        {ctaButtons}
      </div>

      {/* Mobile Bottom Sheet */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.3)] z-40 transition-all duration-300 ease-in-out ${isMobileSheetExpanded ? 'max-h-[80vh]' : 'max-h-24'}`}>
        <div className="p-4 flex flex-col h-full">
            {/* Always visible header */}
            <div className="flex justify-between items-center flex-shrink-0 cursor-pointer" onClick={() => setIsMobileSheetExpanded(!isMobileSheetExpanded)}>
                <div className="flex flex-col">
                    <span className="text-gray-300 text-sm">{isMobileSheetExpanded ? 'Price Details' : 'Total Price'}</span>
                     <span className="text-xl font-bold text-white">
                        RM {totalPrice.toFixed(2)}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                   {!isMobileSheetExpanded && (
                        <button onClick={(e) => { e.stopPropagation(); onGetStarted(); }} className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-all duration-200">
                            Get Started
                        </button>
                   )}
                   <ChevronUpIcon className={`w-6 h-6 text-gray-300 transition-transform duration-300 ${isMobileSheetExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Expandable content */}
            <div className="overflow-y-auto mt-2 pt-4 border-t border-gray-700 flex-grow">
                {breakdownContent}
                {ctaButtons}
            </div>
        </div>
      </div>
    </>
  );
};