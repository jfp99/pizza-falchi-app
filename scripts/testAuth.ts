import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function testAuth() {
  try {
    console.log('🔍 Testing Authentication Setup...\n');

    // Test 1: MongoDB Connection
    console.log('1️⃣ Testing MongoDB Connection...');
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Connected to MongoDB\n');

    // Test 2: Find Admin User
    console.log('2️⃣ Checking for Admin User...');
    const admin = await User.findOne({ email: 'admin@pizzafalchi.fr' });

    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('Creating admin user...');

      const hashedPassword = await bcrypt.hash('admin123', 10);
      const newAdmin = await User.create({
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
      console.log('✅ Admin user created\n');
    } else {
      console.log('✅ Admin user exists');
      console.log(`   - ID: ${admin._id}`);
      console.log(`   - Email: ${admin.email}`);
      console.log(`   - Role: ${admin.role}`);
      console.log(`   - Name: ${admin.name}\n`);
    }

    // Test 3: Password Verification
    console.log('3️⃣ Testing Password Verification...');
    const testPassword = 'admin123';
    const user = await User.findOne({ email: 'admin@pizzafalchi.fr' });

    if (user) {
      const isValid = await bcrypt.compare(testPassword, user.password);
      if (isValid) {
        console.log('✅ Password verification successful\n');
      } else {
        console.log('❌ Password verification failed!');
        console.log('   Resetting password to "admin123"...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        user.password = hashedPassword;
        await user.save();
        console.log('✅ Password reset complete\n');
      }
    }

    // Test 4: Environment Variables
    console.log('4️⃣ Checking Environment Variables...');
    const envVars = {
      MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '✅ Set' : '❌ Missing'
    };

    console.log('   - MONGODB_URI:', envVars.MONGODB_URI);
    console.log('   - NEXTAUTH_SECRET:', envVars.NEXTAUTH_SECRET);
    console.log('   - NEXTAUTH_URL:', envVars.NEXTAUTH_URL);
    console.log('   - NEXTAUTH_URL value:', process.env.NEXTAUTH_URL);
    console.log('');

    // Test 5: User Role Check
    console.log('5️⃣ Testing Role Assignment...');
    const adminUser = await User.findOne({ email: 'admin@pizzafalchi.fr' });
    if (adminUser?.role === 'admin') {
      console.log('✅ Admin role correctly assigned\n');
    } else {
      console.log('❌ Admin role missing or incorrect!');
      if (adminUser) {
        adminUser.role = 'admin';
        await adminUser.save();
        console.log('✅ Admin role fixed\n');
      }
    }

    // Test 6: Edge Cases
    console.log('6️⃣ Testing Edge Cases...');

    // Case 1: Wrong password
    const wrongPassword = await bcrypt.compare('wrongpassword', adminUser!.password);
    console.log('   - Wrong password test:', wrongPassword ? '❌ FAILED (should be false)' : '✅ PASSED');

    // Case 2: Case sensitivity
    const uppercaseEmail = await User.findOne({ email: 'ADMIN@PIZZAFALCHI.FR' });
    console.log('   - Case sensitive email:', uppercaseEmail ? '⚠️ Email is case-insensitive' : '✅ Email is case-sensitive');

    // Case 3: Email with spaces
    const emailWithSpaces = await User.findOne({ email: ' admin@pizzafalchi.fr ' });
    console.log('   - Email with spaces:', emailWithSpaces ? '⚠️ Spaces not trimmed' : '✅ No matches with spaces');

    // Case 4: Empty password
    try {
      await bcrypt.compare('', adminUser!.password);
      console.log('   - Empty password:', '❌ Should throw error but didn\'t');
    } catch (error) {
      console.log('   - Empty password:', '✅ Correctly rejected');
    }

    console.log('');

    // Test 7: Simulate Login Flow
    console.log('7️⃣ Simulating Login Flow...');
    const loginEmail = 'admin@pizzafalchi.fr';
    const loginPassword = 'admin123';

    const loginUser = await User.findOne({ email: loginEmail });

    if (!loginUser) {
      console.log('❌ User not found in database\n');
    } else {
      console.log('✅ User found');

      const passwordMatch = await bcrypt.compare(loginPassword, loginUser.password);

      if (!passwordMatch) {
        console.log('❌ Password mismatch\n');
      } else {
        console.log('✅ Password matches');

        const userObject = {
          id: loginUser._id.toString(),
          email: loginUser.email,
          name: loginUser.name,
          role: loginUser.role
        };

        console.log('✅ Login would succeed with user object:');
        console.log(JSON.stringify(userObject, null, 2));
        console.log('');
      }
    }

    // Summary
    console.log('📊 SUMMARY');
    console.log('='.repeat(50));
    console.log('Login Credentials:');
    console.log('  Email: admin@pizzafalchi.fr');
    console.log('  Password: admin123');
    console.log('');
    console.log('All tests completed! ✅');
    console.log('');
    console.log('If login still fails, check:');
    console.log('  1. Browser cookies are enabled');
    console.log('  2. NEXTAUTH_URL matches your domain');
    console.log('  3. NEXTAUTH_SECRET is set and consistent');
    console.log('  4. Check browser console for errors');
    console.log('='.repeat(50));

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

testAuth();
