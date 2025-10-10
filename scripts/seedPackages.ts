import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Package from '../models/Package';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;

const packages = [
  {
    name: '5 Pizzas pour 4',
    description: 'Achetez 5 pizzas au choix, payez-en seulement 4 !',
    originalPrice: 65,
    discountedPrice: 52,
    discount: 20,
    items: [
      {
        type: 'pizza',
        quantity: 5,
        description: 'Margherita, Regina, 4 Fromages ou autres',
      },
    ],
    icon: '🍕',
    color: 'red',
    popular: true,
    badge: '-20%',
    available: true,
  },
  {
    name: 'Menu Solo',
    description: 'Une pizza et une boisson pour un repas complet',
    originalPrice: 14.5,
    discountedPrice: 12.9,
    discount: 11,
    items: [
      {
        type: 'pizza',
        quantity: 1,
        description: 'Pizza au choix (Margherita, Fromage...)',
      },
      {
        type: 'boisson',
        quantity: 1,
        description: 'Coca-Cola 33cl ou autre boisson',
      },
    ],
    icon: '🍕',
    color: 'yellow',
    popular: true,
    badge: '-11%',
    available: true,
  },
  {
    name: 'Menu Duo',
    description: 'Parfait pour partager un bon moment à deux',
    originalPrice: 29,
    discountedPrice: 24.9,
    discount: 14,
    items: [
      {
        type: 'pizza',
        quantity: 2,
        description: '2 pizzas (Regina, 4 Fromages...)',
      },
      {
        type: 'boisson',
        quantity: 2,
        description: '2 Coca-Cola ou autres boissons',
      },
    ],
    icon: '👫',
    color: 'purple',
    popular: true,
    badge: '-14%',
    available: true,
  },
  {
    name: 'Menu Famille',
    description: 'Le menu idéal pour toute la famille',
    originalPrice: 43.5,
    discountedPrice: 36.9,
    discount: 15,
    items: [
      {
        type: 'pizza',
        quantity: 3,
        description: '3 pizzas (Margherita, Jambon, Fromage...)',
      },
      {
        type: 'boisson',
        quantity: 3,
        description: '3 boissons au choix',
      },
    ],
    icon: '👨‍👩‍👧',
    color: 'green',
    popular: true,
    badge: '-15%',
    available: true,
  },
  {
    name: 'Apéro Party',
    description: 'Pour vos soirées et apéritifs entre amis',
    originalPrice: 75.5,
    discountedPrice: 64.9,
    discount: 14,
    items: [
      {
        type: 'pizza',
        quantity: 5,
        description: '5 pizzas variées au choix',
      },
      {
        type: 'boisson',
        quantity: 6,
        description: '6 boissons (Coca, bières...)',
      },
    ],
    icon: '🎉',
    color: 'orange',
    popular: false,
    badge: '-14%',
    available: false,
  },
  {
    name: 'Méga Deal',
    description: '10 pizzas pour un prix imbattable - Idéal pour les grands groupes',
    originalPrice: 130,
    discountedPrice: 99,
    discount: 24,
    items: [
      {
        type: 'pizza',
        quantity: 10,
        description: '10 pizzas classiques (Margherita, Regina, Fromage...)',
      },
    ],
    icon: '🔥',
    color: 'red',
    popular: false,
    badge: '-24%',
    available: false,
  },
];

async function seedPackages() {
  try {
    console.log('🔗 Connexion à MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté avec succès!');

    // Clear existing packages
    await Package.deleteMany({});
    console.log('🗑️  Suppression des packages existants...');

    // Insert new packages
    const result = await Package.insertMany(packages);
    console.log(`✅ ${result.length} packages créés avec succès!`);
    console.log('');
    console.log('📦 PACKAGES DISPONIBLES:');
    result.forEach(pkg => {
      console.log(`   ${pkg.icon} ${pkg.name} - ${pkg.discountedPrice}€ (${pkg.badge})`);
    });
    console.log('');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedPackages();
