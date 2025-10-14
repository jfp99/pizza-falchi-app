import { describe, it, expect } from 'vitest';
import { orderSchema } from '../order';

describe('Order Validation Schema', () => {
  const validOrderData = {
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '06 12 34 56 78',
    deliveryType: 'delivery' as const,
    deliveryAddress: {
      street: '123 Main St',
      city: 'Paris',
      postalCode: '75001',
    },
    items: [
      {
        product: '507f1f77bcf86cd799439011',
        quantity: 2,
        price: 12.5,
      },
    ],
    subtotal: 25,
    tax: 2.5,
    deliveryFee: 3,
    total: 30.5,
    paymentMethod: 'card' as const,
    notes: 'Ring the doorbell twice',
  };

  describe('Valid Data', () => {
    it('should accept valid order data with all fields', () => {
      const result = orderSchema.safeParse(validOrderData);
      expect(result.success).toBe(true);
    });

    it('should accept valid order without optional fields', () => {
      const minimalOrder = {
        customerName: 'Jane Smith',
        phone: '06 12 34 56 78',
        deliveryType: 'pickup' as const,
        items: [{ product: '507f1f77bcf86cd799439011', quantity: 1, price: 15 }],
        subtotal: 15,
        tax: 0,
        deliveryFee: 0,
        total: 15,
        paymentMethod: 'cash' as const,
      };

      const result = orderSchema.safeParse(minimalOrder);
      expect(result.success).toBe(true);
    });

    it('should accept pickup orders without delivery address', () => {
      const pickupOrder = { ...validOrderData, deliveryType: 'pickup' as const };
      delete pickupOrder.deliveryAddress;

      const result = orderSchema.safeParse(pickupOrder);
      expect(result.success).toBe(true);
    });
  });

  describe('Invalid Data - Required Fields', () => {
    it('should reject order without customerName', () => {
      const invalidOrder = { ...validOrderData };
      delete (invalidOrder as any).customerName;

      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('customerName');
      }
    });

    it('should reject order without phone', () => {
      const invalidOrder = { ...validOrderData };
      delete (invalidOrder as any).phone;

      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });

    it('should reject order without items', () => {
      const invalidOrder = { ...validOrderData, items: [] };

      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });

    it('should reject order without total', () => {
      const invalidOrder = { ...validOrderData };
      delete (invalidOrder as any).total;

      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });
  });

  describe('Invalid Data - Field Validation', () => {
    it('should reject invalid email format', () => {
      const invalidOrder = { ...validOrderData, email: 'not-an-email' };

      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });

    it('should reject negative prices', () => {
      const invalidOrder = {
        ...validOrderData,
        items: [{ product: 'pizza-123', quantity: 1, price: -10 }],
      };

      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });

    it('should reject negative quantities', () => {
      const invalidOrder = {
        ...validOrderData,
        items: [{ product: 'pizza-123', quantity: -1, price: 12.5 }],
      };

      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });

    it('should reject zero quantity', () => {
      const invalidOrder = {
        ...validOrderData,
        items: [{ product: 'pizza-123', quantity: 0, price: 12.5 }],
      };

      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });

    it('should reject invalid delivery type', () => {
      const invalidOrder = { ...validOrderData, deliveryType: 'invalid' as any };

      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });

    it('should reject invalid payment method', () => {
      const invalidOrder = { ...validOrderData, paymentMethod: 'crypto' as any };

      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should accept very long customer names', () => {
      const longNameOrder = { ...validOrderData, customerName: 'Jean-Pierre de la Fontaine-Dupont'.repeat(2) };

      const result = orderSchema.safeParse(longNameOrder);
      expect(result.success).toBe(true);
    });

    it('should accept multiple items', () => {
      const multiItemOrder = {
        ...validOrderData,
        items: [
          { product: '507f1f77bcf86cd799439011', quantity: 2, price: 12.5 },
          { product: '507f1f77bcf86cd799439012', quantity: 3, price: 3.5 },
          { product: '507f1f77bcf86cd799439013', quantity: 1, price: 5.0 },
        ],
        subtotal: 40.5,
        tax: 4.05,
        total: 47.55,
      };

      const result = orderSchema.safeParse(multiItemOrder);
      expect(result.success).toBe(true);
    });

    it('should accept decimal prices', () => {
      const decimalPriceOrder = {
        ...validOrderData,
        items: [{ product: '507f1f77bcf86cd799439011', quantity: 1, price: 12.99 }],
        subtotal: 12.99,
        tax: 0,
        deliveryFee: 0,
        total: 12.99,
      };

      const result = orderSchema.safeParse(decimalPriceOrder);
      expect(result.success).toBe(true);
    });
  });
});
