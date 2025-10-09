'use client';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import CartItem from './CartItem';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, getTotalPrice, clearCart } = useCart();

  const deliveryFee = 2.50;
  const total = getTotalPrice() + deliveryFee;

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
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sous-total:</span>
                    <span className="font-semibold">{getTotalPrice().toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Livraison:</span>
                    <span className="font-semibold">{deliveryFee}€</span>
                  </div>
                  <div className="flex justify-between items-center text-lg border-t pt-2">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-primary-red">{total.toFixed(2)}€</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-primary-red text-white py-3 rounded-lg hover:bg-red-700 transition font-bold">
                    Commander • {total.toFixed(2)}€
                  </button>
                  
                  <button 
                    onClick={clearCart}
                    className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
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