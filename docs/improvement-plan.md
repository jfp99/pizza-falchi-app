# Pizza Falchi - S-Tier Improvement Plan

**Goal:** Increase overall score from **58/100** to **90+/100** (S-Tier)
**Timeline:** 4-6 weeks
**Current Status:** NOT PRODUCTION-READY

---

## Phase 1: Critical Fixes (Week 1) 🔴

**Goal:** Address immediate security and testing gaps
**Target:** Make app production-safe

### 1.1 Fix Testing Infrastructure (Priority: CRITICAL)

#### Install and Configure Vitest Properly
```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom happy-dom
```

#### Create Test Setup File
**File:** `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.{ts,js}',
        '**/types/',
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

**File:** `tests/setup.ts`
```typescript
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

#### Write First Test Suite
**File:** `hooks/__tests__/useCart.test.ts`
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '../useCart';

describe('useCart Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.getTotalItems()).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart());
    const mockProduct = {
      _id: '1',
      name: 'Margherita',
      price: 10,
      category: 'pizza'
    };

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.getTotalItems()).toBe(1);
    expect(result.current.getTotalPrice()).toBe(10);
  });

  it('should persist cart to localStorage', () => {
    const { result } = renderHook(() => useCart());
    const mockProduct = {
      _id: '1',
      name: 'Margherita',
      price: 10,
      category: 'pizza'
    };

    act(() => {
      result.current.addItem(mockProduct);
    });

    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(stored.length).toBe(1);
  });
});
```

**Acceptance Criteria:**
- [ ] Vitest runs successfully
- [ ] At least 10 unit tests passing
- [ ] Test coverage report generated
- [ ] CI/CD pipeline includes tests

---

### 1.2 Implement Rate Limiting (Priority: CRITICAL)

#### Install Dependencies
```bash
npm install express-rate-limit
```

#### Create Rate Limiter Middleware
**File:** `lib/rateLimiter.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export const createRateLimiter = (config: RateLimitConfig) => {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const key = `${ip}:${request.nextUrl.pathname}`;

    if (!store[key] || now > store[key].resetTime) {
      store[key] = {
        count: 1,
        resetTime: now + config.windowMs
      };
      return null;
    }

    store[key].count++;

    if (store[key].count > config.maxRequests) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((store[key].resetTime - now) / 1000))
          }
        }
      );
    }

    return null;
  };
};

// Pre-configured limiters
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5
});

export const apiLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30
});
```

#### Apply to API Routes
**File:** `app/api/auth/[...nextauth]/route.ts` (update)
```typescript
import { authLimiter } from '@/lib/rateLimiter';

export async function POST(request: NextRequest) {
  const rateLimitResponse = await authLimiter(request);
  if (rateLimitResponse) return rateLimitResponse;

  // ... rest of auth logic
}
```

**Apply to all API routes:** `/api/products`, `/api/orders`, `/api/upload`, etc.

**Acceptance Criteria:**
- [ ] Rate limiting on all API endpoints
- [ ] Auth endpoints limited to 5 attempts/15min
- [ ] General API limited to 30 requests/min
- [ ] Proper 429 responses with Retry-After header

---

### 1.3 Add Input Validation with Zod (Priority: CRITICAL)

#### Install Zod
```bash
npm install zod
```

#### Create Validation Schemas
**File:** `lib/validations/order.ts`
```typescript
import { z } from 'zod';

export const deliveryAddressSchema = z.object({
  street: z.string().min(5, 'Adresse trop courte').max(200),
  city: z.string().min(2, 'Ville requise').max(100),
  postalCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
  additionalInfo: z.string().max(500).optional()
});

export const orderItemSchema = z.object({
  product: z.string().regex(/^[a-f\d]{24}$/i, 'ID produit invalide'),
  quantity: z.number().int().min(1).max(50),
  price: z.number().positive().max(1000)
});

export const orderSchema = z.object({
  customerName: z.string()
    .min(2, 'Nom trop court')
    .max(100, 'Nom trop long')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nom invalide'),
  email: z.string().email('Email invalide').optional(),
  phone: z.string().regex(
    /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    'Numéro de téléphone invalide'
  ),
  deliveryType: z.enum(['delivery', 'pickup']),
  deliveryAddress: deliveryAddressSchema.optional(),
  items: z.array(orderItemSchema).min(1, 'Panier vide'),
  subtotal: z.number().positive(),
  tax: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  total: z.number().positive(),
  paymentMethod: z.enum(['card', 'cash', 'online']),
  notes: z.string().max(500).optional()
}).refine(
  (data) => {
    if (data.deliveryType === 'delivery') {
      return !!data.deliveryAddress;
    }
    return true;
  },
  {
    message: 'Adresse de livraison requise',
    path: ['deliveryAddress']
  }
);
```

**File:** `lib/validations/product.ts`
```typescript
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string()
    .min(3, 'Nom trop court')
    .max(100, 'Nom trop long')
    .trim(),
  description: z.string()
    .min(10, 'Description trop courte')
    .max(1000, 'Description trop longue')
    .trim(),
  price: z.number()
    .positive('Prix doit être positif')
    .max(100, 'Prix maximum dépassé'),
  category: z.enum(['pizza', 'boisson', 'dessert', 'accompagnement']),
  image: z.string().url('URL image invalide'),
  ingredients: z.array(z.string().max(100)).max(20).optional(),
  available: z.boolean().default(true),
  popular: z.boolean().default(false),
  spicy: z.boolean().default(false),
  vegetarian: z.boolean().default(false),
  tags: z.array(z.string().max(50)).max(10).optional(),
  stock: z.number().int().nonnegative().default(100),
  minStock: z.number().int().nonnegative().default(10)
});
```

#### Update API Routes
**File:** `app/api/orders/route.ts` (update POST)
```typescript
import { orderSchema } from '@/lib/validations/order';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = orderSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Données invalides',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // ... rest of order creation logic with validatedData
  } catch (error) {
    // ... error handling
  }
}
```

**Acceptance Criteria:**
- [ ] All API routes validate input with Zod
- [ ] Detailed validation error messages returned
- [ ] NoSQL injection attempts blocked
- [ ] XSS attempts sanitized

---

### 1.4 Add Security Headers (Priority: HIGH)

#### Update Next.js Config
**File:** `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint in builds
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' *.stripe.com *.vercel-insights.com",
              "frame-src 'self' *.stripe.com"
            ].join('; ')
          }
        ],
      },
    ];
  },
};

export default nextConfig;
```

**Acceptance Criteria:**
- [ ] All security headers present
- [ ] CSP configured without breaking functionality
- [ ] HSTS enabled for HTTPS enforcement
- [ ] Security scan passes (securityheaders.com)

---

### 1.5 Add Skip Links (Priority: HIGH)

#### Create Skip Link Component
**File:** `components/layout/SkipLink.tsx`
```typescript
'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-primary-red focus:text-white focus:rounded-lg focus:font-bold focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-yellow transition-all"
    >
      Aller au contenu principal
    </a>
  );
}
```

#### Update Root Layout
**File:** `app/layout.tsx`
```typescript
import SkipLink from '@/components/layout/SkipLink';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SkipLink />
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
            {/* ... */}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

**Acceptance Criteria:**
- [ ] Skip link visible on Tab key press
- [ ] Skip link focuses main content
- [ ] Keyboard navigation improved

---

## Phase 2: High Priority Improvements (Week 2) 🟡

### 2.1 Implement Structured Data (JSON-LD)

#### Create JSON-LD Component
**File:** `components/seo/StructuredData.tsx`
```typescript
import { Product } from '@/types';

interface ProductStructuredDataProps {
  product: Product;
}

export function ProductStructuredData({ product }: ProductStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `https://www.pizzafalchi.com${product.image}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function LocalBusinessStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Pizza Falchi',
    image: 'https://www.pizzafalchi.com/images/logo-pizzafalchi.jpg',
    '@id': 'https://www.pizzafalchi.com',
    url: 'https://www.pizzafalchi.com',
    telephone: '+33442920308',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ajaccio',
      addressLocality: 'Ajaccio',
      postalCode: '20000',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.9267,
      longitude: 8.7369
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '18:00',
        closes: '21:30'
      }
    ],
    servesCuisine: 'Italian',
    acceptsReservations: 'False'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

#### Add to Pages
```typescript
// In app/products/[id]/page.tsx
<ProductStructuredData product={product} />

// In app/layout.tsx
<LocalBusinessStructuredData />
```

**Acceptance Criteria:**
- [ ] Product schema on product pages
- [ ] LocalBusiness schema on homepage
- [ ] Valid JSON-LD (test with Google Rich Results Test)
- [ ] Rich snippets appear in search results

---

### 2.2 Improve Focus Indicators

#### Add Global Focus Styles
**File:** `app/globals.css`
```css
/* Enhanced Focus Indicators - WCAG 2.1 AA Compliant */
*:focus-visible {
  outline: 3px solid #FFD200;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Remove default focus for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}

/* Link focus */
a:focus-visible {
  outline: 3px solid #FFD200;
  outline-offset: 2px;
  background-color: rgba(255, 210, 0, 0.1);
}

/* Button focus */
button:focus-visible,
[role="button"]:focus-visible {
  outline: 3px solid #FFD200;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(255, 210, 0, 0.3);
}

/* Input focus */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 3px solid #FFD200;
  outline-offset: 0;
  border-color: #FFD200;
  box-shadow: 0 0 0 3px rgba(255, 210, 0, 0.2);
}

/* Skip link enhanced visibility */
.skip-link:focus {
  z-index: 9999;
  position: fixed;
  top: 1rem;
  left: 1rem;
}
```

**Acceptance Criteria:**
- [ ] 3:1 contrast ratio for focus indicators
- [ ] Focus visible on all interactive elements
- [ ] Keyboard navigation smooth
- [ ] Passes WCAG 2.1 AA automated tests

---

### 2.3 Add Database Indexes

#### Create Index Migration Script
**File:** `scripts/addIndexes.ts`
```typescript
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import Order from '@/models/Order';
import Customer from '@/models/Customer';
import User from '@/models/User';

async function addIndexes() {
  await connectDB();

  console.log('Adding database indexes...');

  // Product indexes
  await Product.collection.createIndex({ category: 1, available: 1 });
  await Product.collection.createIndex({ name: 'text', description: 'text' });
  await Product.collection.createIndex({ popular: -1, available: 1 });

  // Order indexes
  await Order.collection.createIndex({ status: 1, createdAt: -1 });
  await Order.collection.createIndex({ phone: 1, createdAt: -1 });
  await Order.collection.createIndex({ createdAt: -1 });

  // Customer indexes
  await Customer.collection.createIndex({ phone: 1 }, { unique: true });
  await Customer.collection.createIndex({ email: 1 });
  await Customer.collection.createIndex({ totalSpent: -1 });

  // User indexes
  await User.collection.createIndex({ email: 1 }, { unique: true });

  console.log('✅ Indexes added successfully');
  process.exit(0);
}

addIndexes().catch(console.error);
```

**Add to package.json:**
```json
"scripts": {
  "db:indexes": "tsx scripts/addIndexes.ts"
}
```

**Acceptance Criteria:**
- [ ] Indexes on frequently queried fields
- [ ] Query performance improved
- [ ] API response times <200ms

---

### 2.4 Implement API Response Caching

#### Install SWR
```bash
npm install swr
```

#### Create SWR Config
**File:** `lib/swr.ts`
```typescript
export const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 2000,
  errorRetryCount: 3,
  errorRetryInterval: 5000
};
```

#### Use in Components
```typescript
'use client';
import useSWR from 'swr';
import { swrConfig } from '@/lib/swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function ProductList() {
  const { data: products, error, isLoading } = useSWR(
    '/api/products',
    fetcher,
    swrConfig
  );

  if (isLoading) return <ProductListSkeleton />;
  if (error) return <ErrorMessage />;

  return <ProductGrid products={products} />;
}
```

**Acceptance Criteria:**
- [ ] Client-side caching with SWR
- [ ] Reduced API calls
- [ ] Optimistic UI updates
- [ ] Loading skeletons implemented

---

## Phase 3: Medium Priority (Week 3) 🟢

### 3.1 Implement Comprehensive Test Suite

#### Target: 50% Code Coverage

**Create Test Files:**
1. `hooks/__tests__/useCart.test.ts` ✅ (Done in Phase 1)
2. `components/__tests__/Navigation.test.tsx`
3. `components/__tests__/ProductCard.test.tsx`
4. `app/api/__tests__/products.test.ts`
5. `app/api/__tests__/orders.test.ts`
6. `lib/__tests__/validations.test.ts`

#### Example API Route Test
**File:** `app/api/__tests__/products.test.ts`
```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { GET, POST } from '../products/route';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

describe('Products API', () => {
  beforeAll(async () => {
    await connectDB();
    await Product.deleteMany({});
  });

  describe('GET /api/products', () => {
    it('should return empty array when no products', async () => {
      const response = await GET();
      const data = await response.json();
      expect(data).toEqual([]);
    });

    it('should return only available products', async () => {
      await Product.create([
        { name: 'Pizza 1', price: 10, category: 'pizza', available: true },
        { name: 'Pizza 2', price: 12, category: 'pizza', available: false }
      ]);

      const response = await GET();
      const data = await response.json();
      expect(data.length).toBe(1);
      expect(data[0].name).toBe('Pizza 1');
    });
  });

  afterAll(async () => {
    await Product.deleteMany({});
  });
});
```

**Acceptance Criteria:**
- [ ] >50% code coverage achieved
- [ ] All critical paths tested
- [ ] Test suite runs in <30 seconds
- [ ] CI/CD pipeline includes tests

---

### 3.2 Add CSRF Protection

#### Install csurf alternative for Next.js
```bash
npm install @edge-csrf/nextjs
```

#### Implement Middleware
**File:** `middleware.ts`
```typescript
import { createCsrfMiddleware } from '@edge-csrf/nextjs';

const csrfMiddleware = createCsrfMiddleware({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    name: '__Host-csrf',
  },
});

export async function middleware(request: NextRequest) {
  const response = await csrfMiddleware(request);
  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
```

**Acceptance Criteria:**
- [ ] CSRF tokens on state-changing requests
- [ ] POST/PUT/DELETE protected
- [ ] GET requests unaffected

---

### 3.3 Reduce Session Timeout

#### Update Auth Config
**File:** `lib/auth.ts`
```typescript
session: {
  strategy: 'jwt',
  maxAge: 7 * 24 * 60 * 60, // 7 days (reduced from 30)
  updateAge: 24 * 60 * 60, // Update session every 24 hours
},
```

**Acceptance Criteria:**
- [ ] Session expires after 7 days
- [ ] Session refreshed on activity
- [ ] Logout clears session completely

---

### 3.4 Implement Bundle Analysis

#### Install Analyzer
```bash
npm install -D @next/bundle-analyzer
```

#### Update Config
**File:** `next.config.ts`
```typescript
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // ... existing config
};

export default withBundleAnalyzer(nextConfig);
```

**Add Script:**
```json
"scripts": {
  "analyze": "ANALYZE=true npm run build"
}
```

**Acceptance Criteria:**
- [ ] Bundle size monitored
- [ ] Initial bundle <200KB gzipped
- [ ] Heavy dependencies lazy loaded
- [ ] Duplicate dependencies eliminated

---

## Phase 4: Polish & Optimization (Week 4) ⚪

### 4.1 Implement E2E Tests with Playwright

#### Install Playwright
```bash
npm install -D @playwright/test
npx playwright install
```

#### Create E2E Tests
**File:** `e2e/checkout.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('should complete full checkout process', async ({ page }) => {
    // Go to menu
    await page.goto('/menu');

    // Add pizza to cart
    await page.click('[data-testid="product-card-margherita"]');
    await page.click('[data-testid="add-to-cart"]');

    // Go to cart
    await page.click('[data-testid="cart-button"]');
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);

    // Proceed to checkout
    await page.click('[data-testid="checkout-button"]');

    // Fill delivery info
    await page.fill('[name="customerName"]', 'Jean Dupont');
    await page.fill('[name="phone"]', '0612345678');
    await page.fill('[name="email"]', 'jean@example.com');

    // Submit order
    await page.click('[data-testid="submit-order"]');

    // Verify confirmation
    await expect(page.locator('text=Commande confirmée')).toBeVisible();
  });
});
```

**Acceptance Criteria:**
- [ ] Checkout flow tested
- [ ] Auth flow tested
- [ ] Admin dashboard tested
- [ ] Mobile viewport tested

---

### 4.2 Implement Code Splitting

#### Lazy Load Heavy Components
```typescript
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'), {
  loading: () => <DashboardSkeleton />,
  ssr: false
});

const ChartComponent = dynamic(() => import('@/components/charts/SalesChart'), {
  loading: () => <ChartSkeleton />
});
```

**Acceptance Criteria:**
- [ ] Admin components lazy loaded
- [ ] Charts lazy loaded
- [ ] Initial bundle reduced by 30%
- [ ] First Load JS <200KB

---

### 4.3 Add Breadcrumbs

#### Create Breadcrumb Component
**File:** `components/layout/Breadcrumbs.tsx`
```typescript
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export default function Breadcrumbs({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="py-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/" className="text-gray-600 hover:text-primary-red">
            Accueil
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {index === items.length - 1 ? (
              <span className="text-charcoal font-semibold" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-gray-600 hover:text-primary-red">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

**Acceptance Criteria:**
- [ ] Breadcrumbs on all pages
- [ ] Structured data for breadcrumbs
- [ ] Mobile-friendly

---

### 4.4 Dynamic Sitemap Generation

#### Create Dynamic Sitemap
**File:** `app/sitemap.ts`
```typescript
import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const products = await Product.find({ available: true }).select('_id updatedAt');

  const productUrls = products.map((product) => ({
    url: `https://www.pizzafalchi.com/products/${product._id}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://www.pizzafalchi.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.pizzafalchi.com/menu',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://www.pizzafalchi.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.pizzafalchi.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...productUrls,
  ];
}
```

**Acceptance Criteria:**
- [ ] Sitemap auto-generated
- [ ] Product pages included
- [ ] Submitted to Google Search Console

---

## Phase 5: Continuous Improvement (Weeks 5-6)

### 5.1 Achieve 80% Test Coverage

**Target Coverage:**
- Utilities: 100%
- Hooks: 90%
- Components: 80%
- API Routes: 70%

### 5.2 Performance Monitoring

**Implement:**
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Error tracking (Sentry)
- Performance budgets

### 5.3 Accessibility Audit

**Tools:**
- axe DevTools
- WAVE
- Lighthouse accessibility score >95
- Manual screen reader testing

### 5.4 Security Audit

**Actions:**
- Penetration testing
- OWASP Top 10 compliance check
- Dependency vulnerability scan
- Security headers verification

---

## Success Metrics

### Final Target Scores

| Category | Current | Target | Status |
|----------|---------|--------|--------|
| Security | 45/100 | 90/100 | 🔴 Critical |
| Accessibility | 55/100 | 90/100 | 🟡 High Priority |
| SEO | 85/100 | 95/100 | 🟢 On Track |
| Performance | 70/100 | 90/100 | 🟡 High Priority |
| Testing | 0/100 | 85/100 | 🔴 Critical |
| **Overall** | **58/100** | **90/100** | **🎯 S-Tier Goal** |

---

## Resource Requirements

### Developer Time
- Week 1 (Critical): 40 hours (1 FTE)
- Week 2 (High Priority): 30 hours (0.75 FTE)
- Week 3 (Medium Priority): 25 hours (0.6 FTE)
- Week 4 (Polish): 20 hours (0.5 FTE)
- Weeks 5-6 (Continuous): 15 hours/week (0.4 FTE)

**Total: ~160 hours over 6 weeks**

### Tools/Services Needed
- Playwright for E2E tests
- Sentry for error tracking (optional)
- Lighthouse CI for performance monitoring
- Security scanning tools

---

## Risk Mitigation

### High-Risk Areas
1. **Testing Implementation** - May uncover bugs requiring fixes
   - Mitigation: Allocate buffer time for bug fixes

2. **Performance Optimization** - Could break existing features
   - Mitigation: Comprehensive testing after each optimization

3. **Security Changes** - May affect user experience
   - Mitigation: Thorough testing, staged rollout

---

## Definition of Done

### Production Ready Checklist
- [ ] All critical security issues resolved
- [ ] Test coverage >80% on critical paths
- [ ] WCAG 2.1 AA compliant
- [ ] Core Web Vitals in "Good" range
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] E2E tests passing
- [ ] Performance budget met
- [ ] SEO audit score >90
- [ ] Documentation updated
- [ ] Deployment pipeline includes all checks

---

## Next Steps

1. **Review and approve this plan** with stakeholders
2. **Set up project tracking** (Jira, Linear, GitHub Projects)
3. **Allocate development resources**
4. **Begin Phase 1 immediately** (Critical fixes)
5. **Schedule weekly progress reviews**
6. **Set up monitoring and alerting**

---

*This improvement plan is designed to bring Pizza Falchi from 58/100 to 90+/100 (S-Tier) within 4-6 weeks of focused development.*
