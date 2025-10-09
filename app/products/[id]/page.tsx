'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Flame, Leaf, Check } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          router.push('/menu');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/menu');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, router]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const getIngredientIcon = (ingredient: string) => {
    const lowerIngredient = ingredient.toLowerCase();
    const icons: { [key: string]: string } = {
      'mozzarella': '🧀', 'emmental': '🧀', 'chèvre': '🐐', 'roquefort': '🧀',
      'parmesan': '🧀', 'raclette': '🧀', 'brousse': '🧀',
      'tomate': '🍅', 'tomates fraîches': '🍅', 'tomates cerise': '🍅',
      'tomate fraîche': '🍅', 'champignons': '🍄', 'champignons de paris': '🍄',
      'poivron': '🫑', 'poivrons': '🫑', 'oignons': '🧅', 'ail': '🧄',
      'aubergines grillées': '🍆', 'artichauts': '🥬', 'olives': '🫒',
      'basilic': '🌿', 'persil': '🌿', 'herbes de provence': '🌿', 'câpres': '🌿',
      'jambon': '🥓', 'jambon cru': '🥓', 'lardons': '🥓', 'chorizo': '🌶️',
      'merguez': '🌶️', 'viande hachée': '🥩', 'viande kebab': '🥙',
      'poulet': '🍗', 'figatelli': '🥩',
      'anchois': '🐟', 'thon': '🐟', 'saumon': '🐟', 'fruits de mer': '🦐',
      'oeuf': '🥚', 'miel': '🍯', 'crème fraîche': '🥛', 'sauce curry': '🍛',
      "huile d'olive": '🫒', 'amandes': '🌰',
    };
    return icons[lowerIngredient] || '✨';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-red border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-warm-cream py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour au menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
              <img
                src={product.image || '/images/pizza-placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.popular && (
                  <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    Populaire
                  </span>
                )}
                {product.spicy && (
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Flame className="w-4 h-4" />
                    Épicé
                  </span>
                )}
                {product.vegetarian && (
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Leaf className="w-4 h-4" />
                    Végétarien
                  </span>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-2xl">
                {product.category === 'pizza' && '🍕'}
                {product.category === 'boisson' && '🥤'}
                {product.category === 'dessert' && '🍰'}
                {product.category === 'accompagnement' && '🍟'}
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider">
                {product.category}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-black text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-gray-600 mb-2">Prix</p>
              <p className="text-5xl font-black text-gray-900">
                {product.price.toFixed(2)}€
              </p>
            </div>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingrédients</h2>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 border border-gray-200"
                    >
                      <span className="text-lg">{getIngredientIcon(ingredient)}</span>
                      <span className="capitalize">{ingredient}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-3">Quantité</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-12 h-12 rounded-xl flex items-center justify-center transition font-bold"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-3xl font-bold text-gray-900 w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-12 h-12 rounded-xl flex items-center justify-center transition font-bold"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.available}
                className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {added ? (
                  <>
                    <Check className="w-6 h-6" />
                    Ajouté au panier !
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Ajouter au panier • {(product.price * quantity).toFixed(2)}€
                  </>
                )}
              </button>

              {!product.available && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <p className="text-red-600 font-semibold">Produit temporairement indisponible</p>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Informations</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Préparé avec des ingrédients frais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Disponible en livraison et à emporter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Cuisson au feu de bois</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
