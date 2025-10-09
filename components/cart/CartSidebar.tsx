'use client';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import Link from 'next/link';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        md:relative md:translate-x-0 md:shadow-lg md:rounded-xl md:mt-8 md:w-80
      `}>
        <div className="p-6 h-full flex flex-col">
          {/* En-tête */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Votre Panier</h2>
            <button 
              onClick={onClose}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg mb-2">Votre panier est vide</p>
              <p className="text-gray-400">Ajoutez des produits délicieux !</p>
            </div>
          ) : (
            <>
              {/* Liste des articles */}
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </div>

              {/* Résumé et actions */}
              <div className="border-t pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-charcoal">Sous-total</span>
                    <span className="font-bold text-primary-red text-xl">{subtotal.toFixed(2)}€</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Les frais de livraison seront calculés à l'étape suivante
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full bg-primary-red hover:bg-primary-red-dark text-white py-4 rounded-2xl transition font-bold flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Passer commande
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full border-2 border-gray-200 text-charcoal py-3 rounded-2xl hover:bg-gray-50 transition font-semibold"
                  >
                    Vider le panier
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}