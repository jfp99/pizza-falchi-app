'use client';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus, Clock, Truck, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 30 ? 0 : 5; // Free delivery above 30€
  const total = subtotal + deliveryFee;

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} retiré du panier`);
  };

  const handleClearCart = () => {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      clearCart();
      toast.success('Panier vidé');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-cream to-primary-yellow/10 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary-red/10 to-primary-yellow/10 rounded-full mb-6">
              <ShoppingCart className="w-16 h-16 text-primary-red" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              Votre panier est vide
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Découvrez nos délicieuses pizzas artisanales !
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-red to-soft-red text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
            >
              Explorer le menu
              <span className="text-2xl">🍕</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream via-white to-primary-yellow/5 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-red transition-colors font-semibold mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Continuer mes achats
          </Link>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-5xl font-black text-gray-900 mb-2">
                Mon Panier
                <span className="ml-3 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-primary-red to-soft-red text-white text-lg rounded-full">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Finalisez votre commande gourmande
              </p>
            </div>
            {subtotal < 30 && (
              <div className="hidden lg:block bg-gradient-to-r from-primary-yellow/20 to-primary-yellow/10 border border-primary-yellow/30 rounded-2xl p-4">
                <p className="text-sm font-semibold text-gray-800">
                  Plus que {(30 - subtotal).toFixed(2)}€ pour la livraison gratuite ! 🚚
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 relative">
                    <img
                      src={item.product.image || '/images/pizza-placeholder.jpg'}
                      alt={`${item.product.name} - ${item.product.description}`}
                      className="w-28 h-28 object-cover rounded-2xl shadow-sm"
                    />
                    {item.product.popular && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-yellow to-soft-yellow text-gray-800 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        ⭐ Populaire
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-red transition-colors">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-gray-500">
                            {item.product.price.toFixed(2)}€ / unité
                          </p>
                          {item.product.category && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 capitalize">
                              {item.product.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product._id, item.product.name)}
                        className="text-red-400 hover:text-red-600 transition-all p-2 hover:bg-red-50 rounded-xl group/btn"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5 transform group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>

                    {/* Quantity Controls and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="bg-white hover:bg-primary-red hover:text-white text-gray-700 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-bold text-gray-900 w-14 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="bg-white hover:bg-primary-red hover:text-white text-gray-700 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-3xl font-black bg-gradient-to-r from-primary-red to-soft-red bg-clip-text text-transparent">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>

                    {/* Ingredients Preview with icons */}
                    {item.product.ingredients && item.product.ingredients.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                          {item.product.ingredients.slice(0, 4).map((ingredient, idx) => (
                            <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full">
                              {ingredient}
                            </span>
                          ))}
                          {item.product.ingredients.length > 4 && (
                            <span className="text-xs bg-primary-yellow/20 text-gray-700 px-3 py-1 rounded-full font-semibold">
                              +{item.product.ingredients.length - 4} autres
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleClearCart}
                className="group flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold py-3 px-6 hover:bg-red-50 rounded-2xl transition-all duration-200"
              >
                <Trash2 className="w-5 h-5 transform group-hover:rotate-12 transition-transform" />
                Vider le panier
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-100 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Récapitulatif
                </h2>
                <div className="bg-primary-red/10 p-2 rounded-xl">
                  <ShoppingCart className="w-6 h-6 text-primary-red" />
                </div>
              </div>

              {/* Delivery Progress */}
              {subtotal < 30 && (
                <div className="mb-6 bg-gradient-to-r from-primary-yellow/10 to-primary-yellow/5 rounded-2xl p-4">
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Livraison gratuite dans</span>
                    <span>{(30 - subtotal).toFixed(2)}€</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary-yellow to-soft-yellow h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((subtotal / 30) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">🛒</span>
                    Sous-total TTC ({items.reduce((acc, item) => acc + item.quantity, 0)} articles)
                  </span>
                  <span className="font-semibold text-gray-900">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Livraison
                  </span>
                  {deliveryFee === 0 ? (
                    <span className="font-semibold text-green-600">GRATUIT</span>
                  ) : (
                    <span className="font-semibold text-gray-900">{deliveryFee.toFixed(2)}€</span>
                  )}
                </div>
                <div className="pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total TTC</span>
                    <div className="text-right">
                      <p className="text-3xl font-black bg-gradient-to-r from-primary-red to-soft-red bg-clip-text text-transparent">
                        {total.toFixed(2)}€
                      </p>
                      {subtotal >= 30 && (
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          Livraison offerte ! 🎉
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-gradient-to-r from-primary-red to-soft-red hover:from-primary-red-dark hover:to-primary-red text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg mb-4"
              >
                <ShoppingCart className="w-6 h-6" />
                Commander maintenant
              </Link>

              <Link
                href="/menu"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold text-center block transition-all duration-200"
              >
                Ajouter d'autres articles
              </Link>

              {/* Estimated Delivery */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-2xl border border-green-200">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Livraison estimée</p>
                    <p className="text-xs text-gray-600">30-45 minutes après commande</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-1.5 rounded-full">
                    <Truck className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Livraison express garantie</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary-yellow/20 p-1.5 rounded-full">
                    <span className="text-sm">🌟</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Qualité premium garantie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
