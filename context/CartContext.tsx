
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface Coupon {
  code: string;
  discount: number; // percentage (e.g. 10 for 10%)
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleCart: () => void;
  total: number;
  originalTotal: number;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
}

const AVAILABLE_COUPONS: Record<string, number> = {
  'MOMENT10': 10,
  'ARHAMBUILD10': 10,
  'TRYARHAM': 5
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('applied_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('applied_coupon', JSON.stringify(appliedCoupon));
    }
  }, [appliedCoupon]);

  const applyCoupon = (code: string) => {
    const discount = AVAILABLE_COUPONS[code.toUpperCase()];
    if (discount) {
      setAppliedCoupon({ code: code.toUpperCase(), discount });
      return true;
    }
    return false;
  };

  const addToCart = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const clearCart = () => setItems([]);
  const toggleCart = () => setIsOpen(prev => !prev);

  const originalTotal = items.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
  const total = appliedCoupon 
    ? Math.floor(originalTotal * (1 - appliedCoupon.discount / 100)) 
    : originalTotal;

  return (
    <CartContext.Provider value={{ 
      items, 
      isOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      toggleCart, 
      total, 
      originalTotal,
      clearCart,
      appliedCoupon,
      applyCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
