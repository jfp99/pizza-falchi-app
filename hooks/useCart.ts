'use client';
import { useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Charger le panier depuis le localStorage au montage
  useEffect(() => {
    const savedCart = localStorage.getItem('pizza-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Sauvegarder le panier dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('pizza-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product._id === product._id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };
}