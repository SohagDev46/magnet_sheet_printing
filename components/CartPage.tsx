import React, { useState } from 'react';
import { CartItem } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { WOOCOMMERCE_PRODUCT_ID, AJAX_URL } from '../constants';

interface CartPageProps {
  cartItem: CartItem | null;
  onBackToProduct: () => void;
}

const DetailRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-700">
    <dt className="text-sm text-gray-400">{label}</dt>
    <dd className="text-sm font-medium text-white">{value}</dd>
  </div>
);

export const CartPage: React.FC<CartPageProps> = ({ cartItem, onBackToProduct }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProceedToCheckout = async () => {
    if (!cartItem) return;

    // Basic validation
    if (WOOCOMMERCE_PRODUCT_ID === 0 || AJAX_URL.includes('your-wordpress-site.com')) {
        setError("Configuration error: Please set your Product ID and WordPress URL in constants.ts.");
        return;
    }
      
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('action', 'add_custom_magnet_to_cart');
    formData.append('product_id', String(WOOCOMMERCE_PRODUCT_ID));
    formData.append('options', JSON.stringify(cartItem.options));
    formData.append('price', String(cartItem.priceDetails.totalPrice));
    // The nonce is not available in this context without extra work (wp_localize_script)
    // For broader compatibility, we'll rely on the PHP check_ajax_referer which may need adjustment
    // in a production environment for non-logged-in users. A simple nonce can be fetched via a separate API call if needed.
    // For now, this will work for logged-in users.
    // A better approach for public forms would be a dedicated REST API endpoint with a nonce.
    // Let's assume a simple setup for now. We will try to get a nonce if available.
    // A simple way for it to be on the page is via a meta tag if the theme adds it.
    const nonce = (document.querySelector('meta[name="wp-nonce"]') as HTMLMetaElement)?.content || '';
    formData.append('nonce', nonce);


    try {
        const response = await fetch(AJAX_URL, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            // Redirect to the checkout page
            window.location.href = data.data.checkout_url;
        } else {
            throw new Error(data.data?.message || 'An unknown error occurred.');
        }
    } catch (err) {
        let errorMessage = 'Could not connect to the server. Please try again later.';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        setError(errorMessage);
        setIsLoading(false);
    }
  };


  if (!cartItem) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <button
          onClick={onBackToProduct}
          className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  const { options, priceDetails, artwork } = cartItem;
  const buttonText = isLoading ? 'Processing...' : 'Proceed to Checkout';

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBackToProduct} className="text-indigo-400 hover:text-indigo-300 mb-6 text-sm font-semibold">
          &larr; Back to Product Page
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>

        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="md:col-span-1">
                <h2 className="text-lg font-bold text-white mb-3">Artwork Preview</h2>
                {artwork ? (
                  <img src={artwork.previewUrl} alt="Artwork preview" className="w-full aspect-square object-contain bg-gray-700 rounded-lg p-2" />
                ) : (
                  <div className="w-full aspect-square bg-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400">
                    <UploadIcon className="w-12 h-12 mb-2"/>
                    <span className="text-sm font-medium">Artwork to be uploaded later</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                 <h2 className="text-lg font-bold text-white mb-3">Order Summary</h2>
                 <dl>
                    <DetailRow label="Artwork Size" value={options.size === 'Custom' ? `${options.customWidth}x${options.customHeight} ${options.unit}` : options.size} />
                    <DetailRow label="Quantity (A3 Sheets)" value={options.quantity} />
                    <DetailRow label="Material" value={options.material} />
                    <DetailRow label="Printing" value={options.printing} />
                    <DetailRow label="Lamination" value={options.lamination} />
                    <DetailRow label="Shape" value={options.shape} />
                    <DetailRow label="Cutting" value={options.cutting === 'by_us' ? 'By Us' : 'Individual'} />
                    <DetailRow label="Shipping" value={options.shipping.charAt(0).toUpperCase() + options.shipping.slice(1)} />
                 </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 p-6 border-t border-gray-700">
            <div className="max-w-sm ml-auto">
                {priceDetails.optionCosts.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm text-gray-300 mb-1">
                        <span>{item.label}</span>
                        <span>RM {item.cost.toFixed(2)}</span>
                    </div>
                ))}
                 <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t border-gray-600">
                    <span>Total</span>
                    <span>RM {priceDetails.totalPrice.toFixed(2)}</span>
                </div>
            </div>
          </div>
        </div>
         {error && (
            <div className="mt-4 bg-red-800/50 border border-red-600 text-red-200 text-sm rounded-lg p-3 text-center">
               <strong>Error:</strong> {error}
            </div>
        )}
        <div className="mt-8 flex justify-end">
            <button 
                onClick={handleProceedToCheckout}
                disabled={isLoading}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors text-lg disabled:bg-gray-500 disabled:cursor-wait"
            >
                {buttonText}
            </button>
        </div>
      </div>
    </div>
  );
};