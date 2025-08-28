
export interface ProductOptions {
  size: string;
  customWidth: string;
  customHeight: string;
  unit: 'mm' | 'cm' | 'in';
  quantity: number; // The final numeric quantity
  quantitySelection: string; // The dropdown selection (e.g., '50' or 'Custom')
  material: string;
  printing: string;
  lamination: string;
  shape: string;
  cutting: 'by_us' | 'individual';
  shipping: 'courier' | 'pickup' | 'ride';
}

export interface CartItem {
  options: ProductOptions;
  priceDetails: PriceDetails;
  artwork?: {
    file: File;
    previewUrl: string;
  };
}

export interface PriceDetails {
  basePrice: number;
  optionCosts: { label: string; cost: number }[];
  totalPrice: number;
}

export type Page = 'product' | 'cart';