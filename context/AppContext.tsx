'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: { id: string; name: string; price: number; image: string }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subscribeEmail: (email: string) => boolean;
  subscribedEmails: string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('locky_cart');
    const savedEmails = localStorage.getItem('locky_emails');

    // Defer state updates to trigger in the next microtask, avoiding synchronous cascading renders
    setTimeout(() => {
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error('Error parsing cart from localStorage', e);
        }
      }
      if (savedEmails) {
        try {
          setSubscribedEmails(JSON.parse(savedEmails));
        } catch (e) {
           console.error('Error parsing emails', e);
        }
      }
    }, 0);
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('locky_cart', JSON.stringify(newCart));
  };

  const addToCart = (product: { id: string; name: string; price: number; image: string }) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      const updated = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const subscribeEmail = (email: string): boolean => {
    if (!email || !email.includes('@')) return false;
    if (subscribedEmails.includes(email)) return true; // Already subscribed

    const updated = [...subscribedEmails, email];
    setSubscribedEmails(updated);
    localStorage.setItem('locky_emails', JSON.stringify(updated));
    return true;
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        subscribeEmail,
        subscribedEmails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
