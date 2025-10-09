import mongoose from 'mongoose';
import Product from '../models/Product';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

// Map product names to available local images
const imageMapping: { [key: string]: string } = {
  // Pizzas - specific images
  'margherita': '/images/pizzas/margherita.jpg',
  'fromage': '/images/pizzas/4-fromages.jpg',
  '4 fromages': '/images/pizzas/4-fromages.jpg',
  'quatre fromages': '/images/pizzas/4-fromages.jpg',

  // Boissons - specific images
  'coca': '/images/boissons/coca-cola.jpg',
  'coca-cola': '/images/boissons/coca-cola.jpg',
  'coke': '/images/boissons/coca-cola.jpg',
  'corona': '/images/boissons/corona.jpg',
  'heineken': '/images/boissons/heineken.jpg',
  'chouffe': '/images/boissons/chouffe.jpg',
  'ice tea': '/images/boissons/ice-tea-bottle.jpg',
  'ice-tea': '/images/boissons/ice-tea-bottle.jpg',
  'lipton': '/images/boissons/ice-tea-bottle.jpg',
};

// Fallback images by category
const categoryFallbacks: { [key: string]: string } = {
  'pizza': '/images/pizzas/margherita.jpg',
  'boisson': '/images/boissons/placeholder.svg',
  'dessert': '/images/pizza-placeholder.jpg',
  'accompagnement': '/images/pizza-placeholder.jpg',
};

function getImageForProduct(productName: string, category: string): string {
  const nameLower = productName.toLowerCase();

  // Check for exact or partial match in imageMapping
  for (const [key, imagePath] of Object.entries(imageMapping)) {
    if (nameLower.includes(key)) {
      return imagePath;
    }
  }

  // Use category fallback
  return categoryFallbacks[category] || '/images/pizza-placeholder.jpg';
}

async function updateProductImagesLocal() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Connected to MongoDB\n');

    // Get all products
    const products = await Product.find({});
    console.log(`📦 Found ${products.length} products\n`);

    let updated = 0;

    for (const product of products) {
      const newImagePath = getImageForProduct(product.name, product.category);

      await Product.findByIdAndUpdate(product._id, {
        image: newImagePath
      });

      console.log(`✅ Updated: ${product.name} (${product.category}) -> ${newImagePath}`);
      updated++;
    }

    console.log(`\n✅ Updated ${updated} products with local images`);
    console.log('🖼️  Your products now use local images from public/images/');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateProductImagesLocal();
