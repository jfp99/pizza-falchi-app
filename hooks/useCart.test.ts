import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCart } from './useCart';
import { Product } from '@/types';

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const mockProduct: Product = {
    _id: '1',
    name: 'Margherita',
    description: 'Classic pizza',
    price: 10,
    category: 'pizza',
    image: '/images/pizzas/margherita.jpg',
    ingredients: ['tomato', 'mozzarella', 'basil'],
    available: true,
  };

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toEqual([]);
    expect(result.current.getTotalItems()).toBe(0);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product).toEqual(mockProduct);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.getTotalItems()).toBe(1);
  });

  it('should increment quantity when adding same item', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.getTotalItems()).toBe(2);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.removeItem(mockProduct._id);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(mockProduct._id, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.getTotalItems()).toBe(5);
  });

  it('should remove item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(mockProduct._id, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should calculate total price correctly', () => {
    const { result } = renderHook(() => useCart());

    const product2: Product = {
      ...mockProduct,
      _id: '2',
      name: 'Pepperoni',
      price: 12,
    };

    act(() => {
      result.current.addItem(mockProduct); // 10
      result.current.addItem(mockProduct); // 10
      result.current.addItem(product2);    // 12
    });

    expect(result.current.getTotalPrice()).toBe(32); // (10 * 2) + 12
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotalItems()).toBe(0);
  });

  it('should persist cart to localStorage', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'pizza-cart',
      expect.any(String)
    );
  });

  it('should load cart from localStorage on mount', () => {
    const savedCart = [
      { product: mockProduct, quantity: 2 }
    ];

    localStorage.getItem = vi.fn(() => JSON.stringify(savedCart));

    const { result } = renderHook(() => useCart());

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });
});
