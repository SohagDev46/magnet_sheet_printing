
import React, { useState, useCallback, useEffect } from 'react';
import { Page, CartItem } from './types';
import { ProductPage } from './components/ProductPage';
import { CartPage } from './components/CartPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('product');
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const handleAddToCart = useCallback((item: CartItem) => {
    setCartItem(item);
    setCurrentPage('cart');
  }, []);

  const handleBackToProduct = useCallback(() => {
    setCurrentPage('product');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div>
      {currentPage === 'product' && <ProductPage onAddToCart={handleAddToCart} />}
      {currentPage === 'cart' && <CartPage cartItem={cartItem} onBackToProduct={handleBackToProduct} />}
    </div>
  );
};

export default App;
