import { Plus, Star, Flame, Leaf } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const getIngredientIcon = (ingredient: string) => {
    const lowerIngredient = ingredient.toLowerCase();
    const icons: { [key: string]: string } = {
      // Fromages
      'mozzarella': '🧀',
      'emmental': '🧀',
      'chèvre': '🐐',
      'roquefort': '🧀',
      'parmesan': '🧀',
      'raclette': '🧀',
      'brousse': '🧀',

      // Légumes
      'tomate': '🍅',
      'tomates fraîches': '🍅',
      'tomates cerise': '🍅',
      'tomate fraîche': '🍅',
      'champignons': '🍄',
      'champignons de paris': '🍄',
      'poivron': '🫑',
      'poivrons': '🫑',
      'oignons': '🧅',
      'ail': '🧄',
      'aubergines grillées': '🍆',
      'artichauts': '🥬',
      'olives': '🫒',

      // Herbes et Épices
      'basilic': '🌿',
      'persil': '🌿',
      'herbes de provence': '🌿',
      'câpres': '🌿',

      // Viandes
      'jambon': '🥓',
      'jambon cru': '🥓',
      'lardons': '🥓',
      'chorizo': '🌶️',
      'merguez': '🌶️',
      'viande hachée': '🥩',
      'viande kebab': '🥙',
      'poulet': '🍗',
      'figatelli': '🥩',

      // Poissons
      'anchois': '🐟',
      'thon': '🐟',
      'saumon': '🐟',
      'fruits de mer': '🦐',

      // Autres
      'oeuf': '🥚',
      'miel': '🍯',
      'crème fraîche': '🥛',
      'sauce curry': '🍛',
      "huile d'olive": '🫒',
      'amandes': '🌰',
    };
    return icons[lowerIngredient] || '✨';
  };

  return (
    <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image || '/images/pizza-placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Clean overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.popular && (
            <span className="bg-gradient-to-r from-soft-yellow to-primary-yellow text-charcoal px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-xl backdrop-blur-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>Populaire</span>
            </span>
          )}
          {product.spicy && (
            <span className="bg-gradient-to-r from-soft-red to-primary-red text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-xl backdrop-blur-sm">
              <Flame className="w-4 h-4" />
              <span>Épicé</span>
            </span>
          )}
          {product.vegetarian && (
            <span className="bg-gradient-to-r from-soft-green to-basil-light text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-xl backdrop-blur-sm">
              <Leaf className="w-4 h-4" />
              <span>Végétarien</span>
            </span>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-xl">
          <span className="text-2xl font-black text-primary-red">
            {product.price}€
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-black text-charcoal mb-2 group-hover:text-primary-red transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Ingrédients avec icônes - Improved */}
        {product.ingredients && product.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.ingredients.slice(0, 4).map(ingredient => (
              <span
                key={ingredient}
                className="bg-gradient-to-br from-soft-yellow-lighter to-soft-red-lighter text-charcoal px-3 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 border border-soft-yellow-light"
              >
                <span className="text-base">{getIngredientIcon(ingredient)}</span>
                <span className="capitalize">{ingredient}</span>
              </span>
            ))}
            {product.ingredients.length > 4 && (
              <span className="bg-soft-red-lighter text-soft-red px-3 py-2 rounded-xl text-sm font-bold">
                +{product.ingredients.length - 4}
              </span>
            )}
          </div>
        )}

        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.available}
          className="w-full bg-primary-red hover:bg-primary-red-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter au panier</span>
        </button>

        {!product.available && (
          <div className="bg-soft-red-lighter border border-soft-red rounded-2xl p-3 text-center">
            <p className="text-primary-red font-bold text-sm">Temporairement indisponible</p>
          </div>
        )}
      </div>
    </div>
  );
}