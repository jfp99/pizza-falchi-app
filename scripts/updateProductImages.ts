import mongoose from 'mongoose';
import Product from '../models/Product';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

// Unsplash placeholder URLs with specific food categories
const getImageUrl = (category: string, productName: string) => {
  const searchTerms: { [key: string]: string } = {
    'pizza': 'pizza,italian,food',
    'boisson': 'drink,beverage,refreshment',
    'dessert': 'dessert,sweet,pastry',
    'accompagnement': 'side,dish,food'
  };

  const search = searchTerms[category] || 'food';
  // Use Unsplash Source API with specific search terms
  return `https://source.unsplash.com/400x400/?${search}`;
};

async function updateProductImages() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    // Get all products
    const products = await Product.find({});
    console.log(`📦 Found ${products.length} products`);

    let updated = 0;

    for (const product of products) {
      // Only update if image is missing or is a local path that doesn't exist
      if (!product.image || product.image.includes('/images/')) {
        const newImageUrl = getImageUrl(product.category, product.name);

        await Product.findByIdAndUpdate(product._id, {
          image: newImageUrl
        });

        console.log(`✅ Updated: ${product.name} -> ${newImageUrl}`);
        updated++;
      } else {
        console.log(`⏭️  Skipped: ${product.name} (already has external URL)`);
      }
    }

    console.log(`\n✅ Updated ${updated} products with Unsplash images`);
    console.log('🎨 Your products now have beautiful placeholder images!');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateProductImages();
