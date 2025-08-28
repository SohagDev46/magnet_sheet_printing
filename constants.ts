import { ProductOptions } from './types';

// --- ACTION REQUIRED ---
// 1. Replace '0' with the Product ID you created in WooCommerce (from Part 1, Step 1).
// 2. Replace 'https://your-wordpress-site.com' with your actual website URL.
export const WOOCOMMERCE_PRODUCT_ID = 0; // <-- IMPORTANT: CHANGE THIS
export const WORDPRESS_URL = 'https://your-wordpress-site.com'; // <-- IMPORTANT: CHANGE THIS

// This creates the full URL to the WordPress AJAX handler.
export const AJAX_URL = `${WORDPRESS_URL}/wp-admin/admin-ajax.php`;

export const BASE_PRICE = 25; // RM25 per A3 sheet

export const SIZES = ['A3', 'A4', 'A5', 'A6', 'A7', 'Custom'];
export const QUANTITIES = [1, 5, 10, 20, 50, 100, 200, 500, 'Custom'];
export const MATERIALS = ['Standard Gloss', 'Premium Matte', 'Heavy Duty Vinyl'];
export const PRINTING_OPTIONS = ['Full Color (Front)', 'Black & White (BW) Print'];
export const LAMINATION_OPTIONS = ['None', 'Gloss Lamination', 'Matte Lamination'];
export const SHAPES = ['Square/Rectangle', 'Circle/Oval', 'Custom Die-cut'];

export const CUTTING_COST = 5;
export const SHIPPING_COST = 10;

export const DEFAULT_OPTIONS: ProductOptions = {
  size: 'A3',
  customWidth: '',
  customHeight: '',
  unit: 'mm',
  quantity: 1,
  quantitySelection: '1',
  material: 'Standard Gloss',
  printing: 'Full Color (Front)',
  lamination: 'None',
  shape: 'Square/Rectangle',
  cutting: 'individual',
  shipping: 'pickup',
};

export const PRODUCT_IMAGES = [
  "https://www.klccprint.com/wp-content/uploads/2025/08/magnet-sheet-demo-photo-2.jpg",
  "https://www.klccprint.com/wp-content/uploads/2025/08/magnet-sheet-demo-photo-4.jpg",
  "https://www.klccprint.com/wp-content/uploads/2025/08/magnet-sheet-demo-photo-3.jpg",
  "https://www.klccprint.com/wp-content/uploads/2025/08/magnet-sheet-demo-photo-5.jpg",
  "https://www.klccprint.com/wp-content/uploads/2025/08/magnet-sheet-demo-photo-1.jpg",
];

export const TABS_CONTENT = {
  description: {
    title: "Your Premier Source for High-Quality Magnet Sheets in Malaysia.",
    content: "Unlock powerful branding with KLCC Print's custom magnet sheets. Perfect for vehicle advertising, promotional fridge magnets, and business signage, our magnet sheets are engineered for durability and visual impact. We print your designs in stunning full-colour on premium, weather-resistant material, ensuring your message sticks and stays vibrant. From simple rectangles to intricate custom-cut shapes, we provide the flexibility to bring any idea to life. Get an instant quote and see why businesses across Malaysia trust us for their magnet sheet printing needs.",

  },
  faqs: [
    { q: "What's the difference between standard and heavy-duty magnet sheets?", a: "Our standard sheets are perfect for indoor use like fridge magnets or promotional items. The 'Heavy Duty Vinyl' option is thicker and has a stronger magnetic pull, specifically designed for vehicles. It's weather-proof, UV-resistant, and safe for car paint." },
    { q: "Can you print any custom shape I want?", a: "Yes! Our 'Custom Die-cut' option allows for precise cutting to any shape. Simply provide your artwork with a clear vector cutline on a separate layer. This is perfect for making your brand logo or design truly stand out." },
    { q: "What are the artwork requirements for the best print quality?", a: "For optimal results, please provide your artwork in CMYK color mode with a minimum resolution of 300 DPI. We accept PDF, AI, and PSD files. Using our downloadable template is highly recommended to ensure correct sizing and bleed." },
    { q: "How long will it take to receive my order?", a: "Standard production time is typically 2-4 business days after your artwork has been approved. Shipping time within Malaysia varies based on your location and the courier service selected." },
    { q: "Are the car magnets safe for my vehicle's paint?", a: "Absolutely. Our heavy-duty vehicle magnets are designed to be safe for factory paint jobs. To ensure safety, we recommend regularly removing and cleaning both the magnet and the vehicle surface to prevent moisture and dirt buildup." }
  ],
  template: {
    title: "Artwork Templates & Guidelines",
    content: "To ensure the best possible print quality, please use our design templates. Set your files to CMYK color mode with a resolution of at least 300 DPI. For custom shapes, provide a vector path for the cutline on a separate layer. Accepted file formats are PDF, AI, and PSD.",
    downloadLink: "https://www.klccprint.com/wp-content/uploads/2025/08/Photobook-Editor-–-Full-Feature-Inventory-from-Screenshot.pdf",
  },
  whyUs: {
    title: "Why Choose KLCC Print for Magnet Sheets?",
    points: [
      "Vibrant, UV-Resistant Printing: We use state-of-the-art digital printing technology with UV-cured inks, ensuring your colours are brilliant, sharp, and resistant to fading from the Malaysian sun.",
      "Superior Magnetic Strength: Our magnet sheets provide a powerful, secure grip on any ferrous metal surface, from cars driving at highway speeds to office whiteboards.",
      "Precision Die-Cutting: Our advanced cutting technology delivers clean, flawless edges for any shape, ensuring a professional finish for your custom designs.",
      "Local Malaysian Expertise: As a local business, we understand the market and provide dedicated support, fast turnaround, and reliable delivery across Malaysia.",
    ],
  },
};