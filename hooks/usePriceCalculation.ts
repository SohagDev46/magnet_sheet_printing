
import { useMemo } from 'react';
import { ProductOptions, PriceDetails } from '../types';
import { BASE_PRICE, CUTTING_COST, SHIPPING_COST } from '../constants';

const materialMultipliers: { [key: string]: number } = {
  'Standard Gloss': 1,
  'Premium Matte': 1.2,
  'Heavy Duty Vinyl': 1.5,
};

const printingMultipliers: { [key: string]: number } = {
  'Full Color (Front)': 1,
  'Full Color (Both Sides)': 1.8,
};

const laminationMultipliers: { [key: string]: number } = {
  'None': 0,
  'Gloss Lamination': 0.15,
  'Matte Lamination': 0.2,
};

const shapeMultipliers: { [key: string]: number } = {
  'Square/Rectangle': 1,
  'Circle/Oval': 1.1,
  'Custom Die-cut': 1.3,
};

export const usePriceCalculation = (options: ProductOptions): PriceDetails => {
  return useMemo(() => {
    const optionCosts: { label: string; cost: number }[] = [];
    
    // Size no longer affects the base price. The price is per A3 sheet.
    const base = BASE_PRICE;

    let totalMultiplier = 1;
    totalMultiplier *= materialMultipliers[options.material] || 1;
    totalMultiplier *= printingMultipliers[options.printing] || 1;
    totalMultiplier *= shapeMultipliers[options.shape] || 1;
    
    // Calculate the price per sheet with all options included
    let pricePerSheet = base * totalMultiplier;
    pricePerSheet += base * (laminationMultipliers[options.lamination] || 0);

    // Multiply the final price per sheet by the quantity of sheets
    let subtotal = pricePerSheet * options.quantity;

    if (options.cutting === 'by_us') {
      optionCosts.push({ label: 'Cutting Service', cost: CUTTING_COST });
      subtotal += CUTTING_COST;
    }

    if (options.shipping === 'courier') {
      optionCosts.push({ label: 'Courier Shipping', cost: SHIPPING_COST });
      subtotal += SHIPPING_COST;
    }

    return {
      basePrice: BASE_PRICE, // This is for display ("Base Price: RM 25.00 / A3 sheet")
      optionCosts,
      totalPrice: subtotal,
    };

  }, [options]);
};