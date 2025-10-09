import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900">{item.product.name}</h4>
          <p className="text-sm text-gray-600">{item.product.price}€ × {item.quantity}</p>
          <p className="text-lg font-bold text-primary-red mt-1">
            {(item.product.price * item.quantity).toFixed(2)}€
          </p>
        </div>
        
        <button
          onClick={() => removeItem(item.product._id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
            className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="w-8 text-center font-bold">{item.quantity}</span>
          
          <button
            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
            className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}