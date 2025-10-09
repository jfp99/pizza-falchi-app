'use client';
import { useState, useEffect } from 'react';
import { Search, Filter, Star, Flame, Leaf } from 'lucide-react';
import { Product, Category } from '@/types';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/menu/ProductCard';
import CartSidebar from '@/components/cart/CartSidebar';
import CategoryFilter from '@/components/menu/CategoryFilter';
import SpecialOfferBanner from '@/components/promotions/SpecialOfferBanner';
import toast from 'react-hot-toast';

const categories: Category[] = [
  { id: 'all', name: 'Tout le Menu', icon: '🍕' },
  { id: 'pizza', name: 'Pizzas', icon: '🍕' },
  { id: 'boisson', name: 'Boissons', icon: '🥤' },
  { id: 'dessert', name: 'Desserts', icon: '🍰' },
];

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
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
    toast.success(
      `${product.name} ajouté au panier !`,
      {
        duration: 2000,
        icon: '🍕',
        style: {
          background: '#FFF9F0',
          color: '#1a1a1a',
          fontWeight: '600',
          borderRadius: '16px',
          border: '1px solid #E30613',
        },
      }
    );
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Header - Enhanced with Gradient */}
      <section className="relative bg-gradient-to-br from-charcoal via-gray-700 to-gray-900 py-20 md:py-28 mb-12 overflow-hidden">
        {/* Animated Background Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-primary-red/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary-yellow/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-4 backdrop-blur-sm bg-primary-red/90 border border-primary-red rounded-full px-6 py-2 shadow-xl">
            <span className="text-white text-sm font-bold uppercase tracking-wider">
              Menu Complet
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">
            Notre <span className="text-primary-yellow drop-shadow-lg">Carte</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium drop-shadow-lg">
            Découvrez nos pizzas artisanales préparées avec passion et des ingrédients de qualité
          </p>

          {/* Feature Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="backdrop-blur-md bg-white/10 hover:bg-primary-yellow/20 border border-white/30 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 transition-all duration-300 hover:scale-105">
              <Star className="w-4 h-4 text-primary-yellow fill-primary-yellow" />
              <span className="text-sm font-bold text-white">Populaires</span>
            </div>
            <div className="backdrop-blur-md bg-white/10 hover:bg-primary-red/20 border border-white/30 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 transition-all duration-300 hover:scale-105">
              <Flame className="w-4 h-4 text-primary-red" />
              <span className="text-sm font-bold text-white">Épicés</span>
            </div>
            <div className="backdrop-blur-md bg-white/10 hover:bg-basil-light/20 border border-white/30 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 transition-all duration-300 hover:scale-105">
              <Leaf className="w-4 h-4 text-basil-light" />
              <span className="text-sm font-bold text-white">Végétariens</span>
            </div>
          </div>
        </div>

        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 34.7C840 32 960 32 1080 37.3C1200 43 1320 53 1380 58.7L1440 64V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="#FFF9F0"/>
          </svg>
        </div>
      </section>

      {/* Special Offer Banner */}
      <SpecialOfferBanner />

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Filtres et Recherche - Clean Design */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              suppressHydrationWarning
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