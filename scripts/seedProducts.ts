import * as dotenv from 'dotenv';
import * as path from 'path';
import mongoose from 'mongoose';
import Product from '../models/Product';
import { connectDB } from '../lib/mongodb';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const products = [
  // NOS CLASSIQUES - Pizzas Tomate
  {
    name: "Anchois",
    description: "Tomate, Anchois",
    price: 11.00,
    category: "pizza",
    image: "/images/pizzas/anchois.jpg",
    ingredients: ["tomate", "anchois"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["classique", "poisson"]
  },
  {
    name: "Fromage",
    description: "Tomate, Emmental",
    price: 11.00,
    category: "pizza",
    image: "/images/pizzas/fromage.jpg",
    ingredients: ["tomate", "emmental"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne"]
  },
  {
    name: "Palermo",
    description: "Tomate, Emmental, Câpres, Anchois",
    price: 12.00,
    category: "pizza",
    image: "/images/pizzas/palermo.jpg",
    ingredients: ["tomate", "emmental", "câpres", "anchois"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["classique", "poisson"]
  },
  {
    name: "Jambon",
    description: "Tomate, Emmental, Jambon",
    price: 12.00,
    category: "pizza",
    image: "/images/pizzas/jambon.jpg",
    ingredients: ["tomate", "emmental", "jambon"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["classique", "viande"]
  },
  {
    name: "Venise",
    description: "Tomate, Emmental, Mozzarella",
    price: 12.00,
    category: "pizza",
    image: "/images/pizzas/venise.jpg",
    ingredients: ["tomate", "emmental", "mozzarella"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne"]
  },
  {
    name: "Poivron",
    description: "Tomate, Emmental, Poivron",
    price: 11.50,
    category: "pizza",
    image: "/images/pizzas/poivron.jpg",
    ingredients: ["tomate", "emmental", "poivron"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne"]
  },
  {
    name: "Regina",
    description: "Tomate, Emmental, Jambon, Champignons",
    price: 12.50,
    category: "pizza",
    image: "/images/pizzas/regina.jpg",
    ingredients: ["tomate", "emmental", "jambon", "champignons"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["classique", "viande"]
  },
  {
    name: "Biquette",
    description: "Tomate, Emmental, Chèvre",
    price: 12.50,
    category: "pizza",
    image: "/images/pizzas/biquette.jpg",
    ingredients: ["tomate", "emmental", "chèvre"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne", "fromage"]
  },
  {
    name: "Roquefort",
    description: "Tomate, Emmental, Roquefort",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/roquefort.jpg",
    ingredients: ["tomate", "emmental", "roquefort"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne", "fromage"]
  },
  {
    name: "Champignon",
    description: "Tomate, Champignons de Paris, Emmental",
    price: 12.00,
    category: "pizza",
    image: "/images/pizzas/champignon.jpg",
    ingredients: ["tomate", "champignons", "emmental"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne"]
  },
  {
    name: "Figatelli",
    description: "Tomate, Emmental, Figatelli",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/figatelli.jpg",
    ingredients: ["tomate", "emmental", "figatelli"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["classique", "viande", "corse"]
  },
  {
    name: "Fruits de Mer",
    description: "Tomate, Emmental, Fruits de mer, Ail, Persil",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/fruits-mer.jpg",
    ingredients: ["tomate", "emmental", "fruits de mer", "ail", "persil"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["classique", "poisson"]
  },
  {
    name: "4 Fromages",
    description: "Tomate, Emmental, Chèvre, Mozzarella, Roquefort",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/4-fromages.jpg",
    ingredients: ["tomate", "emmental", "chèvre", "mozzarella", "roquefort"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne", "fromage"]
  },
  {
    name: "Savoyarde",
    description: "Tomate, Emmental, Fromage à raclette, Lardons",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/savoyarde.jpg",
    ingredients: ["tomate", "emmental", "raclette", "lardons"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["classique", "viande", "fromage"]
  },
  {
    name: "Kebab",
    description: "Tomate, Emmental, Viande de kebab",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/kebab.jpg",
    ingredients: ["tomate", "emmental", "viande kebab"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["classique", "viande"]
  },
  {
    name: "Belzebuth",
    description: "Tomate, Emmental, Chorizo",
    price: 12.50,
    category: "pizza",
    image: "/images/pizzas/belzebuth.jpg",
    ingredients: ["tomate", "emmental", "chorizo"],
    available: true,
    popular: false,
    spicy: true,
    vegetarian: false,
    tags: ["classique", "viande", "épicée"]
  },
  {
    name: "Chèvre Miel",
    description: "Tomate, Emmental, Chèvre, Miel",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/chevre-miel.jpg",
    ingredients: ["tomate", "emmental", "chèvre", "miel"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne", "fromage"]
  },

  // NOS CRÈMES FRAÎCHES
  {
    name: "Normande",
    description: "Crème fraîche, Emmental, Champignons, Jambon",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/normande.jpg",
    ingredients: ["crème fraîche", "emmental", "champignons", "jambon"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["crème", "viande"]
  },
  {
    name: "Dame Blanche",
    description: "Crème fraîche, Emmental, Lardons, Oignons",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/dame-blanche.jpg",
    ingredients: ["crème fraîche", "emmental", "lardons", "oignons"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["crème", "viande"]
  },
  {
    name: "Tonthon",
    description: "Crème fraîche, Emmental, Thon, Câpres",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/tonthon.jpg",
    ingredients: ["crème fraîche", "emmental", "thon", "câpres"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["crème", "poisson"]
  },
  {
    name: "Chicken",
    description: "Crème fraîche, Emmental, Poulet, Champignons",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/chicken.jpg",
    ingredients: ["crème fraîche", "emmental", "poulet", "champignons"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["crème", "viande"]
  },
  {
    name: "Viking",
    description: "Crème fraîche, Emmental, Saumon, Amandes",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/viking.jpg",
    ingredients: ["crème fraîche", "emmental", "saumon", "amandes"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["crème", "poisson"]
  },
  {
    name: "Savoyarde Crème",
    description: "Crème fraîche, Emmental, Lardons, Fromage à Raclette",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/savoyarde-creme.jpg",
    ingredients: ["crème fraîche", "emmental", "lardons", "raclette"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["crème", "viande", "fromage"]
  },
  {
    name: "4 Fromages Crème",
    description: "Crème fraîche, Emmental, Mozzarella, Chèvre, Roquefort",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/4-fromages-creme.jpg",
    ingredients: ["crème fraîche", "emmental", "mozzarella", "chèvre", "roquefort"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["crème", "végétarienne", "fromage"]
  },
  {
    name: "Chèvre Miel Crème",
    description: "Crème fraîche, Emmental, Chèvre, Miel",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/chevre-miel-creme.jpg",
    ingredients: ["crème fraîche", "emmental", "chèvre", "miel"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["crème", "végétarienne", "fromage"]
  },
  {
    name: "Kebab Crème",
    description: "Crème fraîche, Emmental, Viande kebab",
    price: 13.00,
    category: "pizza",
    image: "/images/pizzas/kebab-creme.jpg",
    ingredients: ["crème fraîche", "emmental", "viande kebab"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["crème", "viande"]
  },

  // NOS SPÉCIALITÉS
  {
    name: "Pagnol",
    description: "Tomate, Tomate Fraîche, Emmental, Oeuf, Lardons, Herbes de Provence",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/pagnol.jpg",
    ingredients: ["tomate", "tomate fraîche", "emmental", "oeuf", "lardons", "herbes de provence"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["spécialité", "viande"]
  },
  {
    name: "Niçoise",
    description: "Tomate, Tomate Fraîche, Oignons, Anchois, Herbes de Provence, Huile d'olive",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/nicoise.jpg",
    ingredients: ["tomate", "tomate fraîche", "oignons", "anchois", "herbes de provence", "huile d'olive"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["spécialité", "poisson"]
  },
  {
    name: "Mexicana",
    description: "Tomate, Emmental, Oignons, Poivrons, Chorizo",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/mexicana.jpg",
    ingredients: ["tomate", "emmental", "oignons", "poivrons", "chorizo"],
    available: true,
    popular: true,
    spicy: true,
    vegetarian: false,
    tags: ["spécialité", "viande", "épicée"]
  },
  {
    name: "Arménienne",
    description: "Tomate, Emmental, Oignons, Poivrons, Viande Hachée",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/armenienne.jpg",
    ingredients: ["tomate", "emmental", "oignons", "poivrons", "viande hachée"],
    available: true,
    popular: false,
    spicy: true,
    vegetarian: false,
    tags: ["spécialité", "viande", "épicée"]
  },
  {
    name: "Indienne",
    description: "Sauce curry, Emmental, Poulet, Poivron",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/indienne.jpg",
    ingredients: ["sauce curry", "emmental", "poulet", "poivron"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["spécialité", "viande"]
  },
  {
    name: "Pistou",
    description: "Tomate, Ail, Basilic, Tomates cerise, Parmesan",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/pistou.jpg",
    ingredients: ["tomate", "ail", "basilic", "tomates cerise", "parmesan"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: true,
    tags: ["spécialité", "végétarienne", "saisonnière"]
  },
  {
    name: "Végétarienne",
    description: "Tomate, Oignons, Poivrons, Champignons, Emmental",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/vegetarienne.jpg",
    ingredients: ["tomate", "oignons", "poivrons", "champignons", "emmental"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["spécialité", "végétarienne"]
  },
  {
    name: "Napoléon",
    description: "Tomate, Emmental, Figatelli, Brousse",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/napoleon.jpg",
    ingredients: ["tomate", "emmental", "figatelli", "brousse"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["spécialité", "viande", "corse"]
  },
  {
    name: "Anti-Pasti",
    description: "Tomate, Emmental, Mozzarella, Artichauts, Jambon cru",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/anti-pasti.jpg",
    ingredients: ["tomate", "emmental", "mozzarella", "artichauts", "jambon cru"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["spécialité", "viande"]
  },
  {
    name: "Parmesane",
    description: "Tomate, Emmental, Aubergines Grillées, Parmesan, Filet de crème fraîche",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/parmesane.jpg",
    ingredients: ["tomate", "emmental", "aubergines grillées", "parmesan", "crème fraîche"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: true,
    tags: ["spécialité", "végétarienne"]
  },
  {
    name: "Orientale",
    description: "Tomate, Emmental, Oignons, Poivrons, Merguez",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/orientale.jpg",
    ingredients: ["tomate", "emmental", "oignons", "poivrons", "merguez"],
    available: true,
    popular: true,
    spicy: true,
    vegetarian: false,
    tags: ["spécialité", "viande", "épicée"]
  },
  {
    name: "Justine",
    description: "Tomate, Tomates fraîches, Anchois, Mozzarella",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/justine.jpg",
    ingredients: ["tomate", "tomates fraîches", "anchois", "mozzarella"],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["spécialité", "poisson"]
  },
  {
    name: "Pizza du Moment",
    description: "Demandez la Pizza du Moment à notre Équipe",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/pizza-moment.jpg",
    ingredients: [],
    available: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["spécialité", "du moment"]
  },

  // NOS VINS
  {
    name: "Vin Rouge Vignerons du Castellas",
    description: "Vin rouge, Coteau d'Aix, La Fare les Oliviers",
    price: 7.50,
    category: "boisson",
    image: "/images/boissons/vin-rouge.jpg",
    ingredients: [],
    available: true,
    popular: true,
    tags: ["vin", "alcool", "rouge"]
  },
  {
    name: "Vin Rosé Vignerons du Castellas",
    description: "Vin rosé, Coteau d'Aix, La Fare les Oliviers",
    price: 7.50,
    category: "boisson",
    image: "/images/boissons/vin-rose.jpg",
    ingredients: [],
    available: true,
    popular: true,
    tags: ["vin", "alcool", "rosé"]
  },
  {
    name: "Vin Blanc Vignerons du Castellas",
    description: "Vin Blanc, Coteau d'Aix, La Fare les Oliviers",
    price: 7.50,
    category: "boisson",
    image: "/images/boissons/vin-blanc.jpg",
    ingredients: [],
    available: true,
    popular: false,
    tags: ["vin", "alcool", "blanc"]
  },

  // NOS BIÈRES
  {
    name: "Heineken",
    description: "Bière blonde 33cl",
    price: 1.80,
    category: "boisson",
    image: "/images/boissons/heineken.jpg",
    ingredients: [],
    available: true,
    popular: true,
    tags: ["bière", "alcool"]
  },
  {
    name: "Corona",
    description: "Bière mexicaine 35,5cl",
    price: 3.30,
    category: "boisson",
    image: "/images/boissons/corona.jpg",
    ingredients: [],
    available: true,
    popular: true,
    tags: ["bière", "alcool"]
  },
  {
    name: "San Miguel",
    description: "Bière espagnole 33cl",
    price: 2.80,
    category: "boisson",
    image: "/images/boissons/san-miguel.jpg",
    ingredients: [],
    available: true,
    popular: false,
    tags: ["bière", "alcool"]
  },
  {
    name: "Chouffe",
    description: "Bière belge 33cl",
    price: 4.50,
    category: "boisson",
    image: "/images/boissons/chouffe.jpg",
    ingredients: [],
    available: true,
    popular: false,
    tags: ["bière", "alcool"]
  },

  // NOS BOISSONS
  {
    name: "Perrier",
    description: "Eau pétillante 33cl",
    price: 1.80,
    category: "boisson",
    image: "/images/boissons/perrier.jpg",
    ingredients: [],
    available: true,
    popular: true,
    tags: ["eau", "pétillante"]
  },
  {
    name: "Bouteille de Coca-Cola",
    description: "Coca-Cola 1,25L",
    price: 3.50,
    category: "boisson",
    image: "/images/boissons/coca-cola-bouteille.jpg",
    ingredients: [],
    available: true,
    popular: true,
    tags: ["soft", "bouteille"]
  },
  {
    name: "Cristaline",
    description: "Eau plate 50cl",
    price: 1.30,
    category: "boisson",
    image: "/images/boissons/cristaline.jpg",
    ingredients: [],
    available: true,
    popular: true,
    tags: ["eau", "plate"]
  },
  {
    name: "Soft",
    description: "Boisson soft 33cl",
    price: 1.80,
    category: "boisson",
    image: "/images/boissons/soft.jpg",
    ingredients: [],
    available: true,
    popular: true,
    tags: ["soft"]
  },
  {
    name: "Bouteille Ice-Tea",
    description: "Ice-Tea 1,5L",
    price: 3.50,
    category: "boisson",
    image: "/images/boissons/ice-tea-bouteille.jpg",
    ingredients: [],
    available: true,
    popular: true,
    tags: ["soft", "bouteille", "thé"]
  }
];

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to database...');
    await connectDB();

    console.log('🗑️  Clearing existing products...');
    await Product.deleteMany({});

    console.log('🌱 Seeding products...');
    const createdProducts = await Product.insertMany(products);

    console.log(`✅ Successfully seeded ${createdProducts.length} products!`);
    console.log('\n📊 Summary:');
    console.log(`   - Pizzas: ${createdProducts.filter(p => p.category === 'pizza').length}`);
    console.log(`   - Boissons: ${createdProducts.filter(p => p.category === 'boisson').length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
