import { describe, it, expect } from 'vitest';
import {
  validateProduct,
  validateOrder,
  validateEmail,
  validatePhone
} from './validation';
import { Product, Order } from '@/types';

describe('validateProduct', () => {
  it('should return no errors for valid product', () => {
    const product: Partial<Product> = {
      name: 'Margherita',
      price: 10,
      category: 'pizza',
    };

    const errors = validateProduct(product);
    expect(errors).toHaveLength(0);
  });

  it('should return error for missing name', () => {
    const product: Partial<Product> = {
      name: '',
      price: 10,
      category: 'pizza',
    };

    const errors = validateProduct(product);
    expect(errors).toContain('Product name is required');
  });

  it('should return error for invalid price', () => {
    const product: Partial<Product> = {
      name: 'Test',
      price: 0,
      category: 'pizza',
    };

    const errors = validateProduct(product);
    expect(errors).toContain('Product price must be greater than 0');
  });

  it('should return error for invalid category', () => {
    const product: Partial<Product> = {
      name: 'Test',
      price: 10,
      category: 'invalid' as any,
    };

    const errors = validateProduct(product);
    expect(errors).toContain('Invalid product category');
  });
});

describe('validateOrder', () => {
  const validOrder: Partial<Order> = {
    items: [
      {
        product: {
          _id: '1',
          name: 'Margherita',
          description: 'Classic',
          price: 10,
          category: 'pizza',
          image: '/test.jpg',
          ingredients: [],
          available: true,
        },
        quantity: 1,
        price: 10,
        total: 10,
      }
    ],
    customerName: 'John Doe',
    phone: '0612345678',
    deliveryType: 'pickup',
    total: 10,
    subtotal: 10,
    tax: 0,
    deliveryFee: 0,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'cash',
  };

  it('should return no errors for valid pickup order', () => {
    const errors = validateOrder(validOrder);
    expect(errors).toHaveLength(0);
  });

  it('should return error for missing items', () => {
    const order = { ...validOrder, items: [] };
    const errors = validateOrder(order);
    expect(errors).toContain('Order must contain at least one item');
  });

  it('should return error for missing customer name', () => {
    const order = { ...validOrder, customerName: '' };
    const errors = validateOrder(order);
    expect(errors).toContain('Customer name is required');
  });

  it('should return error for missing phone', () => {
    const order = { ...validOrder, phone: '' };
    const errors = validateOrder(order);
    expect(errors).toContain('Phone number is required');
  });

  it('should return error for delivery order without address', () => {
    const order = { ...validOrder, deliveryType: 'delivery' as const };
    const errors = validateOrder(order);
    expect(errors).toContain('Delivery address is required for delivery orders');
  });

  it('should return no errors for valid delivery order', () => {
    const order: Partial<Order> = {
      ...validOrder,
      deliveryType: 'delivery',
      deliveryAddress: {
        street: '123 Main St',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
      },
    };

    const errors = validateOrder(order);
    expect(errors).toHaveLength(0);
  });

  it('should return errors for incomplete delivery address', () => {
    const order: Partial<Order> = {
      ...validOrder,
      deliveryType: 'delivery',
      deliveryAddress: {
        street: '',
        city: '',
        postalCode: '',
        country: 'France',
      },
    };

    const errors = validateOrder(order);
    expect(errors).toContain('Street address is required');
    expect(errors).toContain('City is required');
    expect(errors).toContain('Postal code is required');
  });
});

describe('validateEmail', () => {
  it('should validate correct email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    expect(validateEmail('user+tag@example.com')).toBe(true);
  });

  it('should reject invalid email addresses', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('invalid@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('user @example.com')).toBe(false);
  });
});

describe('validatePhone', () => {
  it('should validate French phone numbers', () => {
    expect(validatePhone('0612345678')).toBe(true);
    expect(validatePhone('06 12 34 56 78')).toBe(true);
    expect(validatePhone('+33612345678')).toBe(true);
    expect(validatePhone('+33 6 12 34 56 78')).toBe(true);
    expect(validatePhone('0033612345678')).toBe(true);
  });

  it('should reject invalid phone numbers', () => {
    expect(validatePhone('123')).toBe(false);
    expect(validatePhone('0012345678')).toBe(false);
    expect(validatePhone('invalid')).toBe(false);
  });
});
