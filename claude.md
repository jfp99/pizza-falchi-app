# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Code Style & Conventions

- **TypeScript:** Always use interfaces over types
- **Functions:** Prefer arrow functions
- **Line Length:** Maximum 100 characters
- **Quotes:** Use single quotes over double quotes
- **Naming:** Prefer verbose variable names over short ones (e.g., `userEmail` not `ue`)
- **Comments:** Explain complex logic with clear comments
- **HTML:** Use semantic HTML elements (header, nav, main, section, article, footer)

## Project Rules

- **Images:** All images must be under 500KB
- **Loading States:** Always add loading states for async operations
- **Mobile Testing:** Test on mobile before committing
- **Architecture:** Ask before making major architecture changes
- **Git:** Always show me the git diff before committing

---

## Tech Stack

- **Next.js 15.5.4** (App Router) with React 19
- **TypeScript** for type safety
- **Tailwind CSS 4.0** for styling
- **MongoDB** with Mongoose for data persistence
- **react-hot-toast** for notifications
- **Lucide React** for icons

## Development Commands

```bash
npm run dev              # Start dev server (standard webpack - stable)
npm run dev:turbo        # Start dev server with Turbopack (experimental, may fail on Windows)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run test             # Run tests with Vitest
npm run test:ui          # Run tests with UI
npm run test:coverage    # Run tests with coverage report
npm run seed             # Seed database with products (runs scripts/seedProducts.ts)
npm run seed:admin       # Create admin user
npm run verify-images    # Check for missing product images
npm run update:images    # Update all products with local images from public/images
npm run check:images     # Check first 5 products' image URLs
```

**Note:** Turbopack has known issues on Windows (exit code 0xc0000142). Use `npm run dev` for stable development.

## Architecture Overview

### State Management
- **Cart State:** Managed via `useCart` hook (hooks/useCart.ts) with localStorage persistence
- **Client-side State:** React hooks (useState, useEffect)
- **No global state management library** - local state per component

### Database Layer
- **Connection:** Singleton pattern in lib/mongodb.ts with connection caching for Next.js
- **Models:** Mongoose schemas in models/ directory:
  - `Product`: Products with categories (pizza, boisson, dessert, accompagnement)
  - `Order`: Orders with items, customer info, delivery details, and status tracking
  - `User`: User accounts with roles (admin, customer)

### API Routes (app/api/)
- `/api/products` - GET all products, POST new product
- `/api/products/[id]` - GET/PUT/DELETE single product
- `/api/orders` - GET all orders, POST new order
- `/api/orders/[id]` - GET/PUT single order
- `/api/auth/[...nextauth]` - NextAuth authentication
- `/api/admin/stats` - Admin dashboard statistics
- `/api/upload` - Image upload handling

### Type System
- **Central types:** Defined in types/index.ts
- **Key interfaces:** Product, CartItem, Order, OrderItem, DeliveryAddress
- All components use these shared interfaces for type safety

### Cart System
The cart hook (hooks/useCart.ts) provides:
- `addItem(product)` - Add/increment product
- `removeItem(productId)` - Remove product from cart
- `updateQuantity(productId, quantity)` - Update quantity
- `clearCart()` - Empty cart
- `getTotalItems()` - Total item count
- `getTotalPrice()` - Total price calculation
- Cart persists to localStorage automatically

## Design System

### Tailwind Configuration (tailwind.config.js)
Custom color palette defined:
- **primary:** red (#E30613), yellow (#FFD200) with dark/light variants
- **soft:** red (#F2828B), yellow (#FFE999) with lighter variants
- **basil:** green (#2D5016) for vegetarian indicators
- **cream/warm-cream:** Background colors (#FFF5E6, #FFF9F0)

### Design Philosophy
**IMPORTANT:** All design implementations must be:
- **Authentic:** True to Italian pizza culture and food truck aesthetics
- **Clean:** Minimalist, uncluttered layouts with clear visual hierarchy
- **Professional:** Polished, modern UI without excessive decoration
- **Functional:** Every element serves a purpose - no unnecessary embellishments
- Avoid overly playful or gimmicky elements unless specifically requested
- Prioritize readability and usability over visual complexity

### Design Patterns
- Glass-morphism effects: `bg-white/70 backdrop-blur`
- Rounded corners: `rounded-2xl`, `rounded-3xl`
- Smooth animations: `transition-all duration-300`
- Hover effects: `hover:shadow-2xl`, `transform hover:-translate-y-2`, `hover:scale-105`
- Gradient buttons: `bg-gradient-to-r from-primary-red to-soft-red`

## File Organization

```
app/
  ├── (pages)/              # Public pages
  ├── admin/                # Admin dashboard pages
  ├── api/                  # API routes
  └── layout.tsx            # Root layout with Navigation, Footer, Toaster

components/
  ├── admin/                # Admin-specific components
  ├── cart/                 # Cart components (CartSidebar, CartItem)
  ├── layout/               # Layout components (Navigation, Footer)
  ├── menu/                 # Menu components (ProductCard, CategoryFilter)
  └── providers/            # Context providers (AuthProvider)

hooks/
  └── useCart.ts            # Cart management hook

lib/
  └── mongodb.ts            # Database connection singleton

models/                     # Mongoose schemas
  ├── Product.ts
  ├── Order.ts
  └── User.ts

types/
  └── index.ts              # Shared TypeScript interfaces

scripts/
  └── seedProducts.ts       # Database seeding script

public/images/              # Static product images
  ├── pizzas/
  ├── boissons/
  ├── desserts/
  └── accompagnements/
```

## Order Flow

1. **Browse Menu** (app/menu/page.tsx) → Filter by category → View products
2. **Add to Cart** → useCart hook adds item → Persists to localStorage
3. **View Cart** (app/cart/page.tsx) → Review items → Adjust quantities
4. **Checkout** (app/checkout/page.tsx) → Enter delivery details → Submit order
5. **Order Confirmation** (app/order-confirmation/[id]/page.tsx) → Display order details
6. **Admin Dashboard** (app/admin/orders/page.tsx) → Track order status

### Order Status Lifecycle
`pending` → `confirmed` → `preparing` → `ready` → `completed`
(Can be `cancelled` at any point)

## Environment Variables

Required in `.env.local`:
- `MONGODB_URI` - MongoDB connection string

## Key Implementation Details

### MongoDB Connection Pattern
The connection singleton (lib/mongodb.ts) uses a global cache to prevent connection leaks in Next.js development mode where hot reloading can create multiple connections.

### Cart Persistence
The useCart hook uses two useEffect hooks:
1. Load cart from localStorage on mount
2. Save cart to localStorage on every change

### Product Categories
Products have 4 fixed categories: 'pizza', 'boisson', 'dessert', 'accompagnement'. The category filter and product queries use these exact strings.

### Image Management
Product images are stored in public/images/ with subdirectories by category. The verify-images script checks for missing images referenced in the database.
