import { describe, it, expect } from 'vitest';
import { productSchema } from '../product';

describe('Product Validation Schema', () => {
  const validProductData = {
    name: 'Margherita',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 12.5,
    category: 'pizza' as const,
    image: 'https://example.com/images/pizzas/margherita.jpg',
    ingredients: ['Tomato', 'Mozzarella', 'Basil'],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: true,
  };

  describe('Valid Data', () => {
    it('should accept valid product data with all fields', () => {
      const result = productSchema.safeParse(validProductData);
      expect(result.success).toBe(true);
    });

    it('should accept valid product with minimal required fields', () => {
      const minimalProduct = {
        name: 'Simple Pizza',
        description: 'A simple and delicious pizza',
        price: 10,
        category: 'pizza' as const,
        image: 'https://example.com/images/pizzas/simple.jpg',
      };

      const result = productSchema.safeParse(minimalProduct);
      expect(result.success).toBe(true);
    });

    it('should accept all valid categories', () => {
      const categories = ['pizza', 'boisson', 'dessert', 'accompagnement'];

      categories.forEach((category) => {
        const product = { ...validProductData, category };
        const result = productSchema.safeParse(product);
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Invalid Data - Required Fields', () => {
    it('should reject product without name', () => {
      const invalidProduct = { ...validProductData };
      delete (invalidProduct as any).name;

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('name');
      }
    });

    it('should reject product without price', () => {
      const invalidProduct = { ...validProductData };
      delete (invalidProduct as any).price;

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });

    it('should reject product without category', () => {
      const invalidProduct = { ...validProductData };
      delete (invalidProduct as any).category;

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });
  });

  describe('Invalid Data - Field Validation', () => {
    it('should reject empty product name', () => {
      const invalidProduct = { ...validProductData, name: '' };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });

    it('should reject negative price', () => {
      const invalidProduct = { ...validProductData, price: -5 };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });

    it('should reject zero price', () => {
      const invalidProduct = { ...validProductData, price: 0 };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });

    it('should reject invalid category', () => {
      const invalidProduct = { ...validProductData, category: 'invalid-category' as any };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });

    it('should reject non-boolean available field', () => {
      const invalidProduct = { ...validProductData, available: 'yes' as any };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should accept product with very long name', () => {
      const longNameProduct = { ...validProductData, name: 'A'.repeat(100) };

      const result = productSchema.safeParse(longNameProduct);
      expect(result.success).toBe(true);
    });

    it('should accept product with decimal price', () => {
      const decimalProduct = { ...validProductData, price: 12.99 };

      const result = productSchema.safeParse(decimalProduct);
      expect(result.success).toBe(true);
    });

    it('should accept product with empty ingredients array', () => {
      const noIngredientsProduct = { ...validProductData, ingredients: [] };

      const result = productSchema.safeParse(noIngredientsProduct);
      expect(result.success).toBe(true);
    });

    it('should accept product with many ingredients', () => {
      const manyIngredientsProduct = {
        ...validProductData,
        ingredients: Array(20).fill('Ingredient'),
      };

      const result = productSchema.safeParse(manyIngredientsProduct);
      expect(result.success).toBe(true);
    });

    it('should accept product marked as both vegetarian and spicy', () => {
      const spicyVegProduct = { ...validProductData, spicy: true, vegetarian: true };

      const result = productSchema.safeParse(spicyVegProduct);
      expect(result.success).toBe(true);
    });
  });
});
