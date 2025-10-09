export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'pizza' | 'boisson' | 'dessert' | 'accompagnement';
  image: string;
  ingredients: string[];
  available: boolean;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: {
    size?: string;
    toppings?: string[];
    notes?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  customizations?: {
    size?: string;
    toppings?: string[];
    notes?: string;
  };
  total: number;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id?: string;
  customer?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'cash' | 'online';
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: DeliveryAddress;
  phone: string;
  email?: string;
  customerName: string;
  notes?: string;
  estimatedDelivery?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}