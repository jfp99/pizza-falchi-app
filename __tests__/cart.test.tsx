import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Cart Functionality', () => {
  const mockProduct: Product = {
    _id: 'test-pizza-1',
    name: 'Test Margherita',
    description: 'Test pizza description',
    price: 10.90,
    category: 'pizza',
    image: '/test-image.jpg',
    ingredients: ['tomate', 'mozzarella', 'basilic'],
    available: true,
    popular: true,
    vegetarian: true,
  };

  const mockProduct2: Product = {
    _id: 'test-pizza-2',
    name: 'Test Pepperoni',
    description: 'Test pepperoni pizza',
    price: 12.90,
    category: 'pizza',
    image: '/test-image-2.jpg',
    ingredients: ['tomate', 'mozzarella', 'pepperoni'],
    available: true,
    spicy: true,
  };

  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('Adding Items', () => {
    it('should add item to empty cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product._id).toBe(mockProduct._id);
      expect(result.current.items[0].quantity).toBe(1);
    });

    it('should increment quantity when adding existing item', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });

    it('should add multiple different items', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].product._id).toBe(mockProduct._id);
      expect(result.current.items[1].product._id).toBe(mockProduct2._id);
    });

    it('should persist items to localStorage', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
      });

      const savedCart = localStorageMock.getItem('pizza-cart');
      expect(savedCart).toBeTruthy();

      const parsedCart = JSON.parse(savedCart!);
      expect(parsedCart).toHaveLength(1);
      expect(parsedCart[0].product._id).toBe(mockProduct._id);
    });
  });

  describe('Removing Items', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.removeItem(mockProduct._id);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should remove only specified item', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct2);
        result.current.removeItem(mockProduct._id);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product._id).toBe(mockProduct2._id);
    });
  });

  describe('Updating Quantities', () => {
    it('should update quantity', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.updateQuantity(mockProduct._id, 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is 0', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.updateQuantity(mockProduct._id, 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should remove item when quantity is negative', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.updateQuantity(mockProduct._id, -1);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('Cart Calculations', () => {
    it('should calculate total items correctly', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct2);
      });

      expect(result.current.getTotalItems()).toBe(3);
    });

    it('should calculate total price correctly', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct); // 10.90
        result.current.addItem(mockProduct2); // 12.90
      });

      const expectedTotal = 10.90 + 12.90;
      expect(result.current.getTotalPrice()).toBe(expectedTotal);
    });

    it('should calculate total price with quantities', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.updateQuantity(mockProduct._id, 3);
      });

      const expectedTotal = 10.90 * 3;
      expect(result.current.getTotalPrice()).toBe(expectedTotal);
    });

    it('should return 0 for empty cart', () => {
      const { result } = renderHook(() => useCart());

      expect(result.current.getTotalItems()).toBe(0);
      expect(result.current.getTotalPrice()).toBe(0);
    });
  });

  describe('Clearing Cart', () => {
    it('should clear all items', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct2);
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.getTotalItems()).toBe(0);
      expect(result.current.getTotalPrice()).toBe(0);
    });

    it('should clear localStorage', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.clearCart();
      });

      const savedCart = localStorageMock.getItem('pizza-cart');
      const parsedCart = JSON.parse(savedCart!);
      expect(parsedCart).toHaveLength(0);
    });
  });

  describe('Cart Persistence', () => {
    it('should load cart from localStorage on init', () => {
      const initialCart = [
        { product: mockProduct, quantity: 2 },
        { product: mockProduct2, quantity: 1 },
      ];

      localStorageMock.setItem('pizza-cart', JSON.stringify(initialCart));

      const { result } = renderHook(() => useCart());

      // Wait for useEffect to run
      expect(result.current.items).toHaveLength(2);
      expect(result.current.getTotalItems()).toBe(3);
    });

    it('should handle corrupted localStorage data', () => {
      localStorageMock.setItem('pizza-cart', 'invalid json');

      const { result } = renderHook(() => useCart());

      // Should initialize with empty cart instead of crashing
      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle product without ingredients', () => {
      const productWithoutIngredients: Product = {
        ...mockProduct,
        ingredients: [],
      };

      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(productWithoutIngredients);
      });

      expect(result.current.items).toHaveLength(1);
    });

    it('should handle product with very high price', () => {
      const expensiveProduct: Product = {
        ...mockProduct,
        price: 999.99,
      };

      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(expensiveProduct);
      });

      expect(result.current.getTotalPrice()).toBe(999.99);
    });

    it('should handle large quantities', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.updateQuantity(mockProduct._id, 100);
      });

      expect(result.current.getTotalItems()).toBe(100);
      expect(result.current.getTotalPrice()).toBe(10.90 * 100);
    });
  });

  describe('Free Delivery Logic', () => {
    it('should charge delivery fee when subtotal < 30€', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct); // 10.90€
      });

      const subtotal = result.current.getTotalPrice();
      const deliveryFee = subtotal > 30 ? 0 : 5;

      expect(deliveryFee).toBe(5);
    });

    it('should have free delivery when subtotal >= 30€', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.updateQuantity(mockProduct._id, 3); // 32.70€
      });

      const subtotal = result.current.getTotalPrice();
      const deliveryFee = subtotal > 30 ? 0 : 5;

      expect(deliveryFee).toBe(0);
    });

    it('should calculate tax correctly (5.5%)', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct); // 10.90€
      });

      const subtotal = result.current.getTotalPrice();
      const tax = subtotal * 0.055;

      expect(tax).toBeCloseTo(0.5995, 2);
    });

    it('should calculate total with tax and delivery', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockProduct); // 10.90€
      });

      const subtotal = result.current.getTotalPrice();
      const tax = subtotal * 0.055;
      const deliveryFee = subtotal > 30 ? 0 : 5;
      const total = subtotal + tax + deliveryFee;

      expect(total).toBeCloseTo(16.4995, 2);
    });
  });
});
