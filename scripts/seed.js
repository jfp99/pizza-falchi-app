const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'MONGODB_URI=mongodb+srv://admin_test:3001@cluster0.baqc9ho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Données basées sur le menu de pizzafalchi.com
const pizzas = [
  {
    name: "Margherita",
    description: "Sauce tomate, mozzarella, basilic frais",
    price: 8.90,
    category: "pizza",
    image: "/images/pizzas/margherita.jpg",
    ingredients: ["sauce tomate", "mozzarella", "basilic frais"],
    available: true,
    customizable: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne"]
  },
  {
    name: "Pepperoni",
    description: "Sauce tomate, mozzarella, pepperoni",
    price: 11.90,
    category: "pizza",
    image: "/images/pizzas/pepperoni.jpg",
    ingredients: ["sauce tomate", "mozzarella", "pepperoni"],
    available: true,
    customizable: true,
    popular: true,
    spicy: true,
    vegetarian: false,
    tags: ["épicée", "viande"]
  },
  {
    name: "Reine",
    description: "Sauce tomate, mozzarella, jambon, champignons",
    price: 12.50,
    category: "pizza",
    image: "/images/pizzas/reine.jpg",
    ingredients: ["sauce tomate", "mozzarella", "jambon", "champignons"],
    available: true,
    customizable: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["classique", "viande"]
  },
  {
    name: "4 Fromages",
    description: "Sauce tomate, mozzarella, chèvre, bleu, emmental",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/4-fromages.jpg",
    ingredients: ["sauce tomate", "mozzarella", "chèvre", "bleu", "emmental"],
    available: true,
    customizable: false,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["fromage", "végétarienne"]
  },
  {
    name: "Hawaiienne",
    description: "Sauce tomate, mozzarella, jambon, ananas",
    price: 12.90,
    category: "pizza",
    image: "/images/pizzas/hawaiienne.jpg",
    ingredients: ["sauce tomate", "mozzarella", "jambon", "ananas"],
    available: true,
    customizable: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["exotique", "viande"]
  },
  {
    name: "Calzone",
    description: "Pizza pliée farcie au jambon, fromage et champignons",
    price: 14.50,
    category: "pizza",
    image: "/images/pizzas/calzone.jpg",
    ingredients: ["sauce tomate", "mozzarella", "jambon", "champignons", "oeuf"],
    available: true,
    customizable: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["spécialité", "viande"]
  },
  {
    name: "Végétarienne",
    description: "Sauce tomate, mozzarella, poivrons, oignons, olives, champignons",
    price: 13.90,
    category: "pizza",
    image: "/images/pizzas/vegetarienne.jpg",
    ingredients: ["sauce tomate", "mozzarella", "poivrons", "oignons", "olives", "champignons"],
    available: true,
    customizable: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["légumes", "végétarienne"]
  },
  {
    name: "Spicy Diavola",
    description: "Sauce tomate, mozzarella, salami piquant, piments",
    price: 14.90,
    category: " ",
    image: "/images/pizzas/diavola.jpg",
    ingredients: ["sauce tomate", "mozzarella", "salami piquant", "piments", "origan"],
    available: true,
    customizable: false,
    popular: false,
    spicy: true,
    vegetarian: false,
    tags: ["épicée", "viande"]
  }
];

const boissons = [
  {
    name: "Coca-Cola 33cl",
    description: "Canette de Coca-Cola",
    price: 3.50,
    category: "boisson",
    image: "/images/boissons/coca.jpg",
    ingredients: [],
    available: true,
    customizable: false
  },
  {
    name: "Eau Minérale 50cl",
    description: "Bouteille d'eau minérale",
    price: 2.50,
    category: "boisson",
    image: "/images/boissons/eau.jpg",
    ingredients: [],
    available: true,
    customizable: false
  },
  {
    name: "Bière pression 50cl",
    description: "Bière blonde pression",
    price: 5.50,
    category: "boisson",
    image: "/images/boissons/biere.jpg",
    ingredients: [],
    available: true,
    customizable: false
  }
];

const desserts = [
  {
    name: "Tiramisu",
    description: "Dessert italien au café et mascarpone",
    price: 6.50,
    category: "dessert",
    image: "/images/desserts/tiramisu.jpg",
    ingredients: ["mascarpone", "café", "cacao", "biscuits"],
    available: true,
    customizable: false
  },
  {
    name: "Panna Cotta",
    description: "Crème dessert vanille avec coulis de fruits rouges",
    price: 5.90,
    category: "dessert",
    image: "/images/desserts/panna-cotta.jpg",
    ingredients: ["crème", "vanille", "coulis fruits rouges"],
    available: true,
    customizable: false
  }
];

const accompagnements = [
  {
    name: "Frites Maison",
    description: "Portion de frites croustillantes",
    price: 4.50,
    category: "accompagnement",
    image: "/images/accompagnements/frites.jpg",
    ingredients: ["pommes de terre", "sel"],
    available: true,
    customizable: false
  },
  {
    name: "Salade Verte",
    description: "Salade fraîche avec vinaigrette maison",
    price: 5.50,
    category: "accompagnement",
    image: "/images/accompagnements/salade.jpg",
    ingredients: ["salade", "tomates", "vinaigrette"],
    available: true,
    customizable: false
  }
];

const users = [
  {
    name: "Admin Pizza Falchi",
    email: "admin@pizzafalchi.com",
    password: "admin123",
    role: "admin",
    phone: "+33123456789"
  },
  {
    name: "Marco Falchi",
    email: "marco@pizzafalchi.com",
    password: "marco123",
    role: "admin",
    phone: "+33123456788"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    console.log('🗑️ Nettoyage de la base de données...');
    await mongoose.connection.db.dropDatabase();
    
    // Modèles
    const User = mongoose.model('User', {
      name: String,
      email: String,
      password: String,
      role: String,
      phone: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });

    const Product = mongoose.model('Product', {
      name: String,
      description: String,
      price: Number,
      category: String,
      image: String,
      ingredients: [String],
      available: Boolean,
      customizable: Boolean,
      popular: Boolean,
      spicy: Boolean,
      vegetarian: Boolean,
      tags: [String],
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });

    console.log('👤 Création des utilisateurs...');
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      await User.create({ ...user, password: hashedPassword });
    }
    
    console.log('🍕 Création des produits...');
    const allProducts = [...pizzas, ...boissons, ...desserts, ...accompagnements];
    await Product.insertMany(allProducts);
    
    console.log('✅ Base de données Pizza Falchi initialisée avec succès!');
    console.log('📊 Statistiques:');
    console.log(`   - ${pizzas.length} pizzas créées`);
    console.log(`   - ${boissons.length} boissons créées`);
    console.log(`   - ${desserts.length} desserts créés`);
    console.log(`   - ${accompagnements.length} accompagnements créés`);
    console.log('🔑 Comptes admin:');
    console.log('   admin@pizzafalchi.com / admin123');
    console.log('   marco@pizzafalchi.com / marco123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
}

seed();