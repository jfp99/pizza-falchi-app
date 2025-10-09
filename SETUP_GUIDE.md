# Pizza Truck - Setup Guide

## Phase 1 Complete! ✅

### What's Been Built

1. **Database Seeding Script** (`scripts/seedProducts.ts`)
   - 46 realistic products with French descriptions
   - 12 gourmet pizzas (Margherita, Regina, 4 Fromages, Truffe, Burrata, etc.)
   - 10 beverages (sodas, juices, Italian waters)
   - 6 desserts (Tiramisu, Panna Cotta, Cannoli, etc.)
   - 8 side dishes (Focaccia, Antipasti, Bruschetta, etc.)
   - All products have proper pricing, ingredients, tags, and categories

2. **Image Management System**
   - Image upload component with drag-and-drop (`components/admin/ImageUpload.tsx`)
   - Upload API endpoint (`app/api/upload/route.ts`)
   - Organized folder structure in `public/images/`
   - Support for PNG/JPG up to 5MB
   - Automatic file validation and compression

3. **Placeholder Generator** (`scripts/generatePlaceholders.html`)
   - Browser-based tool to create temporary product images
   - Color-coded by category
   - Ready-to-use placeholders until you add real photos

4. **Updated Menu Page**
   - Now fetches products from the API
   - Dynamic product loading
   - Seamless integration with backend

## Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
Edit `.env.local` with your MongoDB connection string:
```env
MONGODB_URI=your_mongodb_connection_string
```

### Step 3: Seed the Database
```bash
npm run seed
```

Expected output:
```
✅ Successfully seeded 46 products!
   - Pizzas: 12
   - Boissons: 10
   - Desserts: 6
   - Accompagnements: 8
```

### Step 4: Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## Adding Product Images

### Option 1: Generate Placeholders (Quick)
1. Open `scripts/generatePlaceholders.html` in your browser
2. Right-click on each image and "Save Image As..."
3. Save to the appropriate folder in `public/images/`

### Option 2: Use Real Photos (Recommended)
1. Download images from:
   - Unsplash: https://unsplash.com/s/photos/pizza
   - Pexels: https://www.pexels.com/search/pizza/
   - Pixabay: https://pixabay.com/images/search/pizza/

2. Optimize images using TinyPNG or Squoosh
3. Save to folders matching the names in `public/images/README.md`

### Option 3: Use Admin Upload Tool
1. Go to `/admin/products`
2. Use the image upload component
3. Drag and drop images or click to browse

## Project Structure

```
pizza-truck/
├── app/
│   ├── api/
│   │   ├── products/route.ts      # Product API
│   │   └── upload/route.ts        # Image upload API
│   ├── menu/page.tsx              # Menu page (updated)
│   └── admin/                     # Admin panel
├── components/
│   ├── admin/
│   │   └── ImageUpload.tsx        # Image upload component
│   ├── menu/
│   └── cart/
├── models/
│   ├── Product.ts                 # Product schema
│   ├── Order.ts                   # Order schema
│   └── User.ts                    # User schema
├── scripts/
│   ├── seedProducts.ts            # Database seeder
│   └── generatePlaceholders.html  # Placeholder generator
└── public/
    └── images/
        ├── pizzas/
        ├── boissons/
        ├── desserts/
        └── accompagnements/
```

## Next Steps

### Immediate Tasks
1. **Add Product Images**: Follow the guide in `public/images/README.md`
2. **Test the Menu**: Run the app and browse the menu at `/menu`
3. **Verify Cart**: Add items to cart and test functionality

### Phase 2: Online Ordering System
Ready to implement:
- Checkout page with delivery/pickup options
- Payment integration (Stripe/PayPal)
- Order confirmation and tracking
- Email notifications

### Phase 3: Enhanced UX
- Product detail modals with customization
- Pizza size selection (S/M/L)
- Extra toppings
- Promotions banner
- Customer reviews

## Troubleshooting

### Database Connection Issues
- Verify `MONGODB_URI` in `.env.local`
- Ensure MongoDB is running
- Check firewall settings

### Image Upload Not Working
- Check folder permissions
- Verify `public/images/` folders exist
- Clear browser cache

### Menu Not Loading Products
- Run `npm run seed` to populate database
- Check browser console for errors
- Verify API endpoint is running at `/api/products`

## Product Highlights

### Signature Pizzas
- **Margherita** (9.50€) - Mozzarella di bufala, fresh basil
- **Truffe Noire** (18.90€) - Black truffle cream, porcini mushrooms
- **Burrata** (15.90€) - Creamy burrata, cherry tomatoes, pesto

### Popular Items
- All pizzas marked as "popular" appear first
- Vegetarian options clearly labeled
- Spicy items have flame icon

## Support

For issues or questions:
- Check the GitHub issues
- Review Next.js documentation
- Consult MongoDB documentation

## Credits

Built with:
- Next.js 15.5.4
- React 19
- MongoDB + Mongoose
- Tailwind CSS 4.0
- TypeScript
