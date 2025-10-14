import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCart } from '../useCart';
import { Product } from '@/types';

// Mock products for testing
const mockPizza: Product = {
  _id: 'pizza-1',
  name: 'Margherita',
  description: 'Sauce tomate, mozzarella, basilic',
  price: 12.5,
  category: 'pizza',
  image: '/images/pizzas/margherita.jpg',
  available: true,
  popular: true,
  vegetarian: true,
  ingredients: ['Tomate', 'Mozzarella', 'Basilic'],
};

const mockPizza2: Product = {
  _id: 'pizza-2',
  name: 'Regina',
  description: 'Sauce tomate, mozzarella, jambon, champignons',
  price: 14.0,
  category: 'pizza',
  image: '/images/pizzas/regina.jpg',
  available: true,
  popular: false,
  vegetarian: false,
  ingredients: ['Tomate', 'Mozzarella', 'Jambon', 'Champignons'],
};

describe('useCart Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with empty cart', () => {
      const { result } = renderHook(() => useCart());

      expect(result.current.items).toEqual([]);
      expect(result.current.getTotalItems()).toBe(0);
      expect(result.current.getTotalPrice()).toBe(0);
    });

    it('should load cart from localStorage on mount', async () => {
      const savedCart = [{ product: mockPizza, quantity: 2 }];
      localStorage.setItem('pizza-cart', JSON.stringify(savedCart));

      const { result } = renderHook(() => useCart());

      // Wait for useEffect to run and state to update
      await waitFor(() => {
        expect(result.current.items).toHaveLength(1);
      });

      expect(result.current.items[0].product._id).toBe('pizza-1');
      expect(result.current.items[0].quantity).toBe(2);
    });

    it('should handle corrupted localStorage data gracefully', async () => {
      localStorage.setItem('pizza-cart', 'invalid-json');
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useCart());

      // Wait for useEffect to process the corrupted data
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      expect(result.current.items).toEqual([]);
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Adding Items', () => {
    it('should add new item to empty cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product._id).toBe('pizza-1');
      expect(result.current.items[0].quantity).toBe(1);
    });

    it('should increment quantity when adding existing item', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.addItem(mockPizza);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });

    it('should add multiple different items', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.addItem(mockPizza2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.getTotalItems()).toBe(2);
    });

    it('should persist to localStorage when adding item', async () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
      });

      // Wait for useEffect to persist to localStorage
      await waitFor(() => {
        const stored = JSON.parse(localStorage.getItem('pizza-cart') || '[]');
        expect(stored).toHaveLength(1);
      });

      const stored = JSON.parse(localStorage.getItem('pizza-cart') || '[]');
      expect(stored[0].product._id).toBe('pizza-1');
    });
  });

  describe('Removing Items', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.removeItem('pizza-1');
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should only remove specified item', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.addItem(mockPizza2);
        result.current.removeItem('pizza-1');
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product._id).toBe('pizza-2');
    });

    it('should update localStorage when removing item', async () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.addItem(mockPizza2);
        result.current.removeItem('pizza-1');
      });

      // Wait for useEffect to update localStorage
      await waitFor(() => {
        const stored = JSON.parse(localStorage.getItem('pizza-cart') || '[]');
        expect(stored).toHaveLength(1);
      });

      const stored = JSON.parse(localStorage.getItem('pizza-cart') || '[]');
      expect(stored[0].product._id).toBe('pizza-2');
    });
  });

  describe('Updating Quantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.updateQuantity('pizza-1', 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is 0', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.updateQuantity('pizza-1', 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should remove item when quantity is negative', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.updateQuantity('pizza-1', -1);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should only update specified item quantity', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.addItem(mockPizza2);
        result.current.updateQuantity('pizza-1', 3);
      });

      expect(result.current.items[0].quantity).toBe(3);
      expect(result.current.items[1].quantity).toBe(1);
    });
  });

  describe('Clearing Cart', () => {
    it('should clear all items from cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.addItem(mockPizza2);
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.getTotalItems()).toBe(0);
    });

    it('should clear localStorage when clearing cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.clearCart();
      });

      const stored = JSON.parse(localStorage.getItem('pizza-cart') || '[]');
      expect(stored).toHaveLength(0);
    });
  });

  describe('Total Calculations', () => {
    it('should calculate total items correctly', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza); // quantity: 1
        result.current.addItem(mockPizza); // quantity: 2
        result.current.addItem(mockPizza2); // quantity: 1
      });

      expect(result.current.getTotalItems()).toBe(3);
    });

    it('should calculate total price correctly', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza); // 12.5 * 1 = 12.5
        result.current.addItem(mockPizza2); // 14.0 * 1 = 14.0
      });

      expect(result.current.getTotalPrice()).toBe(26.5);
    });

    it('should calculate total price with quantities', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.updateQuantity('pizza-1', 3); // 12.5 * 3 = 37.5
        result.current.addItem(mockPizza2);
        result.current.updateQuantity('pizza-2', 2); // 14.0 * 2 = 28.0
      });

      expect(result.current.getTotalPrice()).toBe(65.5);
    });

    it('should return 0 for empty cart', () => {
      const { result } = renderHook(() => useCart());

      expect(result.current.getTotalItems()).toBe(0);
      expect(result.current.getTotalPrice()).toBe(0);
      expect(result.current.getTotal()).toBe(0);
    });

    it('getTotal should return same value as getTotalPrice', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.addItem(mockPizza2);
      });

      expect(result.current.getTotal()).toBe(result.current.getTotalPrice());
    });
  });

  describe('localStorage Persistence', () => {
    it('should save cart to localStorage on every change', async () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
      });

      // Wait for first save to localStorage
      await waitFor(() => {
        const stored = JSON.parse(localStorage.getItem('pizza-cart') || '[]');
        expect(stored).toHaveLength(1);
      });

      act(() => {
        result.current.addItem(mockPizza2);
      });

      // Wait for second save to localStorage
      await waitFor(() => {
        const stored = JSON.parse(localStorage.getItem('pizza-cart') || '[]');
        expect(stored).toHaveLength(2);
      });
    });

    it('should maintain data integrity across hook instances', async () => {
      // First hook instance
      const { result: result1 } = renderHook(() => useCart());

      act(() => {
        result1.current.addItem(mockPizza);
        result1.current.updateQuantity('pizza-1', 3);
      });

      // Wait for data to be persisted to localStorage
      await waitFor(() => {
        const stored = JSON.parse(localStorage.getItem('pizza-cart') || '[]');
        expect(stored).toHaveLength(1);
        expect(stored[0].quantity).toBe(3);
      });

      // Second hook instance (simulating page reload)
      const { result: result2 } = renderHook(() => useCart());

      // Wait for second hook to load from localStorage
      await waitFor(() => {
        expect(result2.current.items).toHaveLength(1);
      });

      expect(result2.current.items[0].quantity).toBe(3);
      expect(result2.current.getTotalPrice()).toBe(37.5);
    });
  });

  describe('Edge Cases', () => {
    it('should handle adding item with zero price', () => {
      const freeItem: Product = { ...mockPizza, _id: 'free-1', price: 0 };
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(freeItem);
      });

      expect(result.current.getTotalPrice()).toBe(0);
      expect(result.current.getTotalItems()).toBe(1);
    });

    it('should handle very large quantities', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(mockPizza);
        result.current.updateQuantity('pizza-1', 100);
      });

      expect(result.current.items[0].quantity).toBe(100);
      expect(result.current.getTotalPrice()).toBe(1250);
    });

    it('should handle decimal prices correctly', () => {
      const decimalPizza: Product = { ...mockPizza, _id: 'decimal-1', price: 12.99 };
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem(decimalPizza);
        result.current.updateQuantity('decimal-1', 2);
      });

      expect(result.current.getTotalPrice()).toBe(25.98);
    });

    it('should not break with rapid successive calls', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.addItem(mockPizza);
        }
      });

      expect(result.current.items[0].quantity).toBe(10);
    });
  });
});
