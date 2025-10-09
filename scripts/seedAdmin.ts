import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@pizzafalchi.fr' });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
    } else {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const admin = await User.create({
        name: 'Admin Pizza Falchi',
        email: 'admin@pizzafalchi.fr',
        password: hashedPassword,
        role: 'admin',
        phone: '0600000000',
        address: {
          street: '123 Rue de la Pizza',
          city: 'Paris',
          postalCode: '75001',
          country: 'France'
        }
      });

      console.log('✅ Admin user created successfully:');
      console.log('   Email: admin@pizzafalchi.fr');
      console.log('   Password: admin123');
      console.log('   Role: admin');
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedAdmin();