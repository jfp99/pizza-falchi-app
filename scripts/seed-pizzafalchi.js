const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-truck';

// Données basées sur le menu de pizzafalchi.com
const pizzas = [
  {
    name: "Margherita",
    description: "Sauce tomate, mozzarella, basilic frais - la classique italienne",
    price: 8.90,
    category: "pizza",
    image: "/images/pizzas/margherita.jpg",
    ingredients: ["sauce tomate", "mozzarella", "basilic frais"],
    available: true,
    customizable: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne", "italienne"]
  },
  {
    name: "Pepperoni",
    description: "Sauce tomate, mozzarella, pepperoni épicé",
    price: 11.90,
    category: "pizza",
    image: "/images/pizzas/pepperoni.jpg",
    ingredients: ["sauce tomate", "mozzarella", "pepperoni"],
    available: true,
    customizable: true,
    popular: true,
    spicy: true,
    vegetarian: false,
    tags: ["épicée", "viande", "américaine"]
  },
  {
    name: "Reine",
    description: "Sauce tomate, mozzarella, jambon, champignons frais",
    price: 12.50,
    category: "pizza",
    image: "/images/pizzas/reine.jpg",
    ingredients: ["sauce tomate", "mozzarella", "jambon", "champignons"],
    available: true,
    customizable: true,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["classique", "viande", "champignons"]
  },
  {
    name: "4 Fromages",
    description: "Sauce tomate, mozzarella, chèvre, bleu, emmental - un délice fromager",
    price: 13.50,
    category: "pizza",
    image: "/images/pizzas/4-fromages.jpg",
    ingredients: ["sauce tomate", "mozzarella", "chèvre", "bleu", "emmental"],
    available: true,
    customizable: false,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["fromage", "végétarienne", "gourmande"]
  },
  {
    name: "Hawaiienne",
    description: "Sauce tomate, mozzarella, jambon, ananas frais",
    price: 12.90,
    category: "pizza",
    image: "/images/pizzas/hawaiienne.jpg",
    ingredients: ["sauce tomate", "mozzarella", "jambon", "ananas"],
    available: true,
    customizable: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["exotique", "viande", "ananas"]
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
    tags: ["spécialité", "viande", "pliée"]
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
    tags: ["légumes", "végétarienne", "healthy"]
  },
  {
    name: "Spicy Diavola",
    description: "Sauce tomate, mozzarella, salami piquant, piments frais, origan",
    price: 14.90,
    category: "pizza",
    image: "/images/pizzas/diavola.jpg",
    ingredients: ["sauce tomate", "mozzarella", "salami piquant", "piments", "origan"],
    available: true,
    customizable: false,
    popular: false,
    spicy: true,
    vegetarian: false,
    tags: ["épicée", "viande", "pimentée"]
  },
  {
    name: "Napolitaine",
    description: "Sauce tomate, mozzarella, anchois, olives noires, câpres",
    price: 13.90,
    category: "pizza",
    image: "/images/pizzas/napolitaine.jpg",
    ingredients: ["sauce tomate", "mozzarella", "anchois", "olives noires", "câpres"],
    available: true,
    customizable: true,
    popular: false,
    spicy: false,
    vegetarian: false,
    tags: ["tradition", "poisson", "salée"]
  },
  {
    name: "Romaine",
    description: "Sauce tomate, mozzarella, jambon cru, roquette, copeaux de parmesan",
    price: 15.50,
    category: "pizza",
    image: "/images/pizzas/romaine.jpg",
    ingredients: ["sauce tomate", "mozzarella", "jambon cru", "roquette", "parmesan"],
    available: true,
    customizable: false,
    popular: true,
    spicy: false,
    vegetarian: false,
    tags: ["gourmande", "viande", "italienne"]
  }
];

const boissons = [
  {
    name: "Coca-Cola 33cl",
    description: "Canette de Coca-Cola rafraîchissante",
    price: 3.50,
    category: "boisson",
    image: "/images/boissons/coca.jpg",
    ingredients: [],
    available: true,
    customizable: false
  },
  {
    name: "Eau Minérale 50cl",
    description: "Bouteille d'eau minérale naturelle",
    price: 2.50,
    category: "boisson",
    image: "/images/boissons/eau.jpg",
    ingredients: [],
    available: true,
    customizable: false
  },
  {
    name: "Bière pression 50cl",
    description: "Bière blonde pression artisanale",
    price: 5.50,
    category: "boisson",
    image: "/images/boissons/biere.jpg",
    ingredients: [],
    available: true,
    customizable: false
  },
  {
    name: "Jus d'Orange 25cl",
    description: "Jus d'orange pressé frais",
    price: 4.00,
    category: "boisson",
    image: "/images/boissons/jus-orange.jpg",
    ingredients: [],
    available: true,
    customizable: false
  },
  {
    name: "Limonade Maison",
    description: "Limonade artisanale à la menthe fraîche",
    price: 4.50,
    category: "boisson",
    image: "/images/boissons/limonade.jpg",
    ingredients: [],
    available: true,
    customizable: false
  }
];

const desserts = [
  {
    name: "Tiramisu",
    description: "Dessert italien au café et mascarpone, saupoudré de cacao",
    price: 6.50,
    category: "dessert",
    image: "/images/desserts/tiramisu.jpg",
    ingredients: ["mascarpone", "café", "cacao", "biscuits", "oeufs"],
    available: true,
    customizable: false
  },
  {
    name: "Panna Cotta",
    description: "Crème dessert vanille avec coulis de fruits rouges maison",
    price: 5.90,
    category: "dessert",
    image: "/images/desserts/panna-cotta.jpg",
    ingredients: ["crème", "vanille", "coulis fruits rouges", "sucre"],
    available: true,
    customizable: false
  },
  {
    name: "Profiteroles",
    description: "Choux garnis de crème glacée vanille et nappage chocolat chaud",
    price: 7.50,
    category: "dessert",
    image: "/images/desserts/profiteroles.jpg",
    ingredients: ["choux", "crème glacée", "chocolat", "crème fouettée"],
    available: true,
    customizable: false
  },
  {
    name: "Salade de Fruits Frais",
    description: "Mélange de fruits de saison coupés frais",
    price: 5.00,
    category: "dessert",
    image: "/images/desserts/salade-fruits.jpg",
    ingredients: ["fruits de saison", "jus d'orange", "menthe"],
    available: true,
    customizable: false
  }
];

const accompagnements = [
  {
    name: "Frites Maison",
    description: "Portion de frites croustillantes coupées fraîches",
    price: 4.50,
    category: "accompagnement",
    image: "/images/accompagnements/frites.jpg",
    ingredients: ["pommes de terre", "sel", "huile"],
    available: true,
    customizable: false
  },
  {
    name: "Salade Verte",
    description: "Salade fraîche avec vinaigrette maison et croûtons",
    price: 5.50,
    category: "accompagnement",
    image: "/images/accompagnements/salade.jpg",
    ingredients: ["salade", "tomates", "concombre", "vinaigrette", "croûtons"],
    available: true,
    customizable: false
  },
  {
    name: "Pain Ail",
    description: "Pain à l'ail frais, beurré et grillé",
    price: 3.50,
    category: "accompagnement",
    image: "/images/accompagnements/pain-ail.jpg",
    ingredients: ["pain", "ail", "beurre", "persil"],
    available: true,
    customizable: false
  },
  {
    name: "Sauce Supplémentaire",
    description: "Sauce au choix : barbecue, samouraï, andalouse, curry",
    price: 1.50,
    category: "accompagnement",
    image: "/images/accompagnements/sauce.jpg",
    ingredients: [],
    available: true,
    customizable: true
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
  },
  {
    name: "Client Test",
    email: "client@example.com",
    password: "client123",
    role: "customer",
    phone: "+33123456700"
  }
];

async function seed() {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
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
    
    console.log('');
    console.log('✅ Base de données Pizza Falchi initialisée avec succès!');
    console.log('');
    console.log('📊 Statistiques:');
    console.log(`   - ${pizzas.length} pizzas créées`);
    console.log(`   - ${boissons.length} boissons créées`);
    console.log(`   - ${desserts.length} desserts créés`);
    console.log(`   - ${accompagnements.length} accompagnements créés`);
    console.log('');
    console.log('🔑 Comptes de test:');
    console.log('   ADMIN: admin@pizzafalchi.com / admin123');
    console.log('   ADMIN: marco@pizzafalchi.com / marco123');
    console.log('   CLIENT: client@example.com / client123');
    console.log('');
    console.log('🚀 Vous pouvez maintenant démarrer l\'application avec: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
}

// Gestion propre de la fermeture
process.on('SIGINT', async () => {
  console.log('\n🔄 Fermeture de la connexion MongoDB...');
  await mongoose.connection.close();
  process.exit(0);
});

seed();