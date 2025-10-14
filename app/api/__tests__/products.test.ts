import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GET, POST } from '../products/route';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@/lib/mongodb', () => ({
  connectDB: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  authOptions: {},
}));

// Mock Product model
vi.mock('@/models/Product', () => ({
  default: {
    find: vi.fn().mockReturnValue({
      sort: vi.fn().mockResolvedValue([
        {
          _id: 'pizza-1',
          name: 'Margherita',
          description: 'Sauce tomate, mozzarella, basilic',
          price: 12.5,
          category: 'pizza',
          image: '/images/pizzas/margherita.jpg',
          available: true,
          popular: true,
          vegetarian: true,
        },
        {
          _id: 'pizza-2',
          name: 'Regina',
          description: 'Sauce tomate, mozzarella, jambon, champignons',
          price: 14.0,
          category: 'pizza',
          image: '/images/pizzas/regina.jpg',
          available: true,
          popular: false,
          vegetarian: false,
        },
      ]),
    }),
    create: vi.fn().mockImplementation((data) => Promise.resolve({ _id: 'new-id', ...data })),
  },
}));

describe('Products API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('should return all available products', async () => {
      const request = new NextRequest('http://localhost:3000/api/products');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(2);
      expect(data[0].name).toBe('Margherita');
    });

    it('should handle database errors gracefully', async () => {
      const Product = await import('@/models/Product');
      vi.mocked(Product.default.find).mockReturnValueOnce({
        sort: vi.fn().mockRejectedValue(new Error('Database error')),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/products');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
    });
  });

  describe('POST /api/products', () => {
    it('should reject requests without admin authentication', async () => {
      const { getServerSession } = await import('next-auth');
      vi.mocked(getServerSession).mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test Pizza',
          price: 15,
          category: 'pizza',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Non autorisé');
    });

    it('should reject invalid product data', async () => {
      const { getServerSession } = await import('next-auth');
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'admin-1', email: 'admin@test.com', role: 'admin' },
        expires: '2025-12-31',
      } as any);

      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify({
          name: '', // Invalid: empty name
          price: -5, // Invalid: negative price
          category: 'invalid-category', // Invalid: wrong category
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Données de produit invalides');
      expect(data.details).toBeDefined();
    });

    it('should create product with valid admin authentication and data', async () => {
      const { getServerSession } = await import('next-auth');
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'admin-1', email: 'admin@test.com', role: 'admin' },
        expires: '2025-12-31',
      } as any);

      const validProduct = {
        name: 'Quattro Formaggi',
        description: 'Delicious four cheese pizza with mozzarella, gorgonzola, parmesan and ricotta',
        price: 16.5,
        category: 'pizza' as const,
        image: 'https://example.com/images/pizzas/quattro-formaggi.jpg',
        available: true,
        vegetarian: true,
      };

      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify(validProduct),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.name).toBe('Quattro Formaggi');
      expect(data.price).toBe(16.5);
    });
  });
});
