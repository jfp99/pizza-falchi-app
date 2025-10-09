'use client';
import { useState, useEffect } from 'react';
import { Search, Filter, Star, Flame, Leaf } from 'lucide-react';
import { Product, Category } from '@/types';
import { useCart } from '@/hooks/useCart';
import ProductCard from '@/components/menu/ProductCard';
import CartSidebar from '@/components/cart/CartSidebar';
import CategoryFilter from '@/components/menu/CategoryFilter';

// Données temporaires (remplacées par l'API plus tard)
const mockProducts: Product[] = [
  {
    _id: '1',
    name: "Margherita",
    description: "Sauce tomate, mozzarella, basilic frais - la classique italienne",
    price: 8.90,
    category: "pizza",
    image: "/images/pizza-placeholder.jpg",
    ingredients: ["sauce tomate", "mozzarella", "basilic frais"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["classique", "végétarienne"]
  },
  {
    _id: '2',
    name: "Pepperoni",
    description: "Sauce tomate, mozzarella, pepperoni épicé",
    price: 11.90,
    category: "pizza",
    image: "/images/pizza-placeholder.jpg",
    ingredients: ["sauce tomate", "mozzarella", "pepperoni"],
    available: true,
    popular: true,
    spicy: true,
    vegetarian: false,
    tags: ["épicée", "viande"]
  },
  {
    _id: '3',
    name: "4 Fromages",
    description: "Sauce tomate, mozzarella, chèvre, bleu, emmental",
    price: 13.50,
    category: "pizza",
    image: "/images/pizza-placeholder.jpg",
    ingredients: ["sauce tomate", "mozzarella", "chèvre", "bleu", "emmental"],
    available: true,
    popular: true,
    spicy: false,
    vegetarian: true,
    tags: ["fromage", "végétarienne"]
  },
  {
    _id: '4',
    name: "Coca-Cola 33cl",
    description: "Canette de Coca-Cola rafraîchissante",
    price: 3.50,
    category: "boisson",
    image: "/images/pizza-placeholder.jpg",
    ingredients: [],
    available: true
  },
  {
    _id: '5',
    name: "Tiramisu",
    description: "Dessert italien au café et mascarpone",
    price: 6.50,
    category: "dessert",
    image: "/images/pizza-placeholder.jpg",
    ingredients: ["mascarpone", "café", "cacao", "biscuits"],
    available: true
  }
];

const categories: Category[] = [
  { id: 'all', name: 'Tout le Menu', icon: '🍕' },
  { id: 'pizza', name: 'Pizzas', icon: '🍕' },
  { id: 'boisson', name: 'Boissons', icon: '🥤' },
  { id: 'dessert', name: 'Desserts', icon: '🍰' },
  { id: 'accompagnement', name: 'Accompagnements', icon: '🍟' },
];

export default function Menu() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addItem, getTotalItems } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Keep using mock data if API fails
    }
  };

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchTerm]);

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Header - Clean */}
      <div className="bg-white py-16 mb-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-4">
            <span className="bg-primary-red text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              Menu Complet
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-charcoal mb-6">
            Notre <span className="text-primary-red">Carte</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos pizzas artisanales préparées avec passion et des ingrédients de qualité
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Filtres et Recherche - Clean Design */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une pizza, un ingrédient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-red focus:border-primary-red transition-all shadow-sm text-lg"
            />
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Product Count & Filters Summary */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-primary-red p-2 rounded-xl">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-charcoal">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-sm text-primary-red hover:text-primary-red-dark font-semibold transition"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* Grille des produits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl p-12 max-w-md mx-auto shadow-lg">
              <div className="text-7xl mb-6">🍕</div>
              <h3 className="text-3xl font-black text-charcoal mb-4">Aucun résultat trouvé</h3>
              <p className="text-lg text-gray-600 mb-6">Essayez de modifier vos critères de recherche</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-primary-red hover:bg-primary-red-dark text-white px-8 py-3 rounded-2xl font-bold transition-all"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}

        {/* Sidebar Panier */}
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />

        {/* Bouton Panier Mobile - Clean */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-primary-red hover:bg-primary-red-dark text-white p-5 rounded-full shadow-xl md:hidden z-40 transition-all"
        >
          <div className="relative">
            <span className="text-2xl">🛒</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-3 -right-3 bg-primary-yellow text-charcoal rounded-full w-7 h-7 text-sm flex items-center justify-center font-black shadow-lg">
                {getTotalItems()}
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}